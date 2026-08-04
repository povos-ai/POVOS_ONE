import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const host = this.configService.get<string>('EMAIL_HOST');
    const port = this.configService.get<number>('EMAIL_PORT');
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASSWORD');

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port: port || 587,
        secure: port === 465,
        auth: { user, pass },
      });
      this.logger.log('✅ Email transporter initialized');
    } else {
      this.logger.warn('⚠️ Email credentials not configured');
    }
  }

  async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
  }): Promise<{ success: boolean; messageId?: string }> {
    try {
      if (!this.transporter) {
        this.logger.warn('Email transporter not configured');
        return { success: false };
      }

      const from = this.configService.get('EMAIL_FROM') || 'noreply@povosone.com';

      const result = await this.transporter.sendMail({
        from,
        to: params.to,
        subject: params.subject,
        html: params.html,
      });

      this.logger.log(`✅ Email sent to ${params.to}`);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      this.logger.error(`❌ Email failed: ${error.message}`);
      return { success: false };
    }
  }

  async sendVerificationEmail(to: string, name: string, token: string): Promise<{ success: boolean }> {
    const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
    const link = `${frontendUrl}/verify-email?token=${token}`;

    const html = `
      <h1>Welcome to POVOS ONE!</h1>
      <p>Hi ${name},</p>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${link}" style="display:inline-block;padding:12px 24px;background:#667eea;color:white;text-decoration:none;border-radius:6px;">
        Verify Email
      </a>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, you can ignore this email.</p>
      <br>
      <p>Team POVOS ONE</p>
    `;

    return this.sendEmail({
      to,
      subject: 'Verify Your Email - POVOS ONE',
      html,
    });
  }

  async sendPasswordResetEmail(to: string, name: string, token: string): Promise<{ success: boolean }> {
    const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
    const link = `${frontendUrl}/reset-password?token=${token}`;

    const html = `
      <h1>Reset Your Password</h1>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the link below to set a new password:</p>
      <a href="${link}" style="display:inline-block;padding:12px 24px;background:#667eea;color:white;text-decoration:none;border-radius:6px;">
        Reset Password
      </a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, you can ignore this email.</p>
      <br>
      <p>Team POVOS ONE</p>
    `;

    return this.sendEmail({
      to,
      subject: 'Reset Your Password - POVOS ONE',
      html,
    });
  }
}