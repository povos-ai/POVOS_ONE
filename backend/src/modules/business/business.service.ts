import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { SubmitBusinessDto } from './dto/submit-business.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  // ===== BUSINESS OPPORTUNITY MANAGEMENT =====

  async create(userId: string, dto: CreateBusinessDto) {
    return this.prisma.business.create({
      data: {
        workspaceId: dto.workspaceId,
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        type: dto.type,
        category: dto.category,
        sector: dto.sector,
        location: dto.location,
        budget: dto.budget,
        deadline: dto.deadline ? new Date(dto.deadline) : null,
        status: dto.status || 'DRAFT',
        published: dto.published || false,
        metadata: dto.metadata || {},
      },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async findAll(workspaceId?: string) {
    const where: any = {};
    if (workspaceId) {
      where.workspaceId = workspaceId;
    }

    return this.prisma.business.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async findById(id: string) {
    const item = await this.prisma.business.findUnique({
      where: { id },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    if (!item) {
      throw new NotFoundException(`Business item with ID ${id} not found`);
    }

    return item;
  }

  async findBySlug(slug: string) {
    const item = await this.prisma.business.findUnique({
      where: { slug },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    if (!item) {
      throw new NotFoundException(`Business item with slug ${slug} not found`);
    }

    return item;
  }

  async update(id: string, dto: UpdateBusinessDto) {
    await this.findById(id);

    return this.prisma.business.update({
      where: { id },
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        type: dto.type,
        category: dto.category,
        sector: dto.sector,
        location: dto.location,
        budget: dto.budget,
        deadline: dto.deadline ? new Date(dto.deadline) : undefined,
        status: dto.status,
        published: dto.published,
        metadata: dto.metadata,
      },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.business.delete({ where: { id } });
    return { message: 'Business item deleted successfully' };
  }

  // ===== BUSINESS SUBMISSION =====

  async submitApplication(userId: string, dto: SubmitBusinessDto) {
    // Check if business exists
    const business = await this.prisma.business.findUnique({
      where: { id: dto.businessId },
    });

    if (!business) {
      throw new NotFoundException(`Business with ID ${dto.businessId} not found`);
    }

    // Check if already applied
    const existing = await this.prisma.businessSubmission.findFirst({
      where: {
        businessId: dto.businessId,
        userId,
      },
    });

    if (existing) {
      throw new Error('You have already submitted to this business opportunity');
    }

    return this.prisma.businessSubmission.create({
      data: {
        businessId: dto.businessId,
        userId,
        workspaceId: dto.workspaceId,
        data: dto.data || {},
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
      include: {
        business: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }

  async getSubmissions(userId: string) {
    return this.prisma.businessSubmission.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        business: {
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            category: true,
          },
        },
      },
    });
  }

  async getSubmissionById(id: string, userId: string) {
    const submission = await this.prisma.businessSubmission.findUnique({
      where: { id },
      include: {
        business: true,
      },
    });

    if (!submission) {
      throw new NotFoundException(`Submission with ID ${id} not found`);
    }

    if (submission.userId !== userId) {
      throw new NotFoundException('You do not have access to this submission');
    }

    return submission;
  }

  // ===== BUSINESS SEARCH =====

  async search(query: string, workspaceId?: string) {
    const where: any = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { sector: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
      ],
      ...(workspaceId && { workspaceId }),
    };

    return this.prisma.business.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }
}