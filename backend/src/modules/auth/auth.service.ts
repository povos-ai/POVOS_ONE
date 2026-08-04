import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { EmailService } from './email.service';
import { TokenType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        isActive: true,
        emailVerified: false,
      },
    });

    // Assign default role (APPLICANT) via membership
    const defaultRole = await this.prisma.role.findFirst({
      where: { name: 'APPLICANT' },
    });

    if (defaultRole) {
      let workspace = await this.prisma.workspace.findFirst({
        where: { slug: 'povos-platform' },
      });

      if (!workspace) {
        workspace = await this.prisma.workspace.create({
          data: {
            name: 'POVOS Platform',
            slug: 'povos-platform',
            description: 'Main POVOS ONE Platform',
            isActive: true,
            createdById: user.id,
          },
        });
      }

      await this.prisma.membership.create({
        data: {
          userId: user.id,
          workspaceId: workspace.id,
          roleId: defaultRole.id,
          isActive: true,
        },
      });
    }

    // Send verification email
    await this.sendVerificationEmail(user.id);

    return {
      success: true,
      message: 'User registered successfully. Please verify your email.',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        emailVerified: user.emailVerified,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    const memberships = await this.prisma.membership.findMany({
      where: { userId: user.id },
      include: {
        workspace: true,
        role: true,
      },
    });

    return {
      success: true,
      message: 'Login successful',
      accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        workspaces: memberships.map((m) => ({
          id: m.workspace.id,
          name: m.workspace.name,
          slug: m.workspace.slug,
          role: m.role.name,
        })),
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberships: {
          include: {
            workspace: true,
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      workspaces: user.memberships.map((m) => ({
        id: m.workspace.id,
        name: m.workspace.name,
        slug: m.workspace.slug,
        role: m.role.name,
      })),
    };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.isActive) {
      return null;
    }

    return user;
  }

  // ===== EMAIL VERIFICATION =====

  async sendVerificationEmail(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email already verified');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await this.prisma.verificationToken.create({
      data: {
        userId,
        token,
        type: TokenType.EMAIL_VERIFICATION,
        expiresAt,
      },
    });

    await this.emailService.sendVerificationEmail(
      user.email,
      user.firstName || 'User',
      token,
    );

    return { message: 'Verification email sent successfully' };
  }

  async verifyEmail(token: string) {
    const verificationToken = await this.prisma.verificationToken.findFirst({
      where: {
        token,
        type: TokenType.EMAIL_VERIFICATION,
        expiresAt: { gt: new Date() },
        usedAt: null,
      },
    });

    if (!verificationToken) {
      throw new BadRequestException('Invalid or expired token');
    }

    await this.prisma.verificationToken.update({
      where: { id: verificationToken.id },
      data: { usedAt: new Date() },
    });

    await this.prisma.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: true },
    });

    return { message: 'Email verified successfully' };
  }

  // ===== FORGOT PASSWORD =====

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User with this email not found');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await this.prisma.verificationToken.create({
      data: {
        userId: user.id,
        token,
        type: TokenType.PASSWORD_RESET,
        expiresAt,
      },
    });

    await this.emailService.sendPasswordResetEmail(
      user.email,
      user.firstName || 'User',
      token,
    );

    return { message: 'Password reset email sent successfully' };
  }

  async resetPassword(token: string, newPassword: string) {
    const verificationToken = await this.prisma.verificationToken.findFirst({
      where: {
        token,
        type: TokenType.PASSWORD_RESET,
        expiresAt: { gt: new Date() },
        usedAt: null,
      },
    });

    if (!verificationToken) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: verificationToken.userId },
      data: { password: hashedPassword },
    });

    await this.prisma.verificationToken.update({
      where: { id: verificationToken.id },
      data: { usedAt: new Date() },
    });

    await this.prisma.verificationToken.deleteMany({
      where: {
        userId: verificationToken.userId,
        type: TokenType.PASSWORD_RESET,
        id: { not: verificationToken.id },
      },
    });

    return { message: 'Password reset successfully' };
  }
}