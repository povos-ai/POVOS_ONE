import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { SmartApplyDto, BulkApplyDto } from './dto/smart-apply.dto';
import { ApplicationStatus } from '@prisma/client';

@Injectable()
export class SmartApplyService {
  constructor(private readonly prisma: PrismaService) {}

  // ===== TEMPLATE MANAGEMENT =====

  async createTemplate(userId: string, dto: CreateTemplateDto) {
    if (dto.isDefault) {
      await this.prisma.applicationTemplate.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    return this.prisma.applicationTemplate.create({
      data: {
        userId,
        workspaceId: dto.workspaceId,
        name: dto.name,
        description: dto.description,
        data: dto.data || {},
        isDefault: dto.isDefault || false,
      },
    });
  }

  async getTemplates(userId: string) {
    return this.prisma.applicationTemplate.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDefaultTemplate(userId: string) {
    return this.prisma.applicationTemplate.findFirst({
      where: { userId, isDefault: true },
    });
  }

  async getTemplateById(id: string, userId: string) {
    const template = await this.prisma.applicationTemplate.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }

    if (template.userId !== userId) {
      throw new NotFoundException('You do not have access to this template');
    }

    return template;
  }

  async deleteTemplate(id: string, userId: string) {
    await this.getTemplateById(id, userId);
    await this.prisma.applicationTemplate.delete({ where: { id } });
    return { message: 'Template deleted successfully' };
  }

  // ===== SMART APPLY =====

  async smartApply(userId: string, dto: SmartApplyDto) {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: { id: dto.opportunityId },
    });

    if (!opportunity) {
      throw new NotFoundException(`Opportunity with ID ${dto.opportunityId} not found`);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        resumes: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    let templateData = {};
    if (dto.templateId) {
      const template = await this.getTemplateById(dto.templateId, userId);
      templateData = template.data || {};
    }

    const applicationData = {
      ...templateData,
      ...dto.data,
      user: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phone: user?.phone,
      },
      resume: user?.resumes[0] ? {
        id: user.resumes[0].id,
        fileName: user.resumes[0].fileName,
        fileUrl: user.resumes[0].fileUrl,
      } : null,
    };

    const existing = await this.prisma.smartApplication.findFirst({
      where: {
        userId,
        opportunityId: dto.opportunityId,
      },
    });

    if (existing) {
      throw new Error('You have already applied to this opportunity');
    }

    return this.prisma.smartApplication.create({
      data: {
        userId,
        workspaceId: dto.workspaceId,
        opportunityId: dto.opportunityId,
        templateId: dto.templateId,
        data: applicationData,
        status: ApplicationStatus.PENDING,
      },
      include: {
        opportunity: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async bulkApply(userId: string, dto: BulkApplyDto) {
    const results: any[] = [];

    for (const opportunityId of dto.opportunityIds) {
      try {
        const result = await this.smartApply(userId, {
          opportunityId,
          templateId: dto.templateId,
          workspaceId: dto.workspaceId,
        });
        results.push({
          opportunityId,
          success: true,
          data: result,
        });
      } catch (error) {
        results.push({
          opportunityId,
          success: false,
          error: error.message,
        });
      }
    }

    return {
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results,
    };
  }

  async getApplications(userId: string) {
    return this.prisma.smartApplication.findMany({
      where: { userId },
      orderBy: { appliedAt: 'desc' },
      include: {
        opportunity: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            type: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getApplicationById(id: string, userId: string) {
    const application = await this.prisma.smartApplication.findUnique({
      where: { id },
      include: {
        opportunity: true,
        template: true,
      },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    if (application.userId !== userId) {
      throw new NotFoundException('You do not have access to this application');
    }

    return application;
  }

  async updateApplicationStatus(id: string, userId: string, status: ApplicationStatus) {
    const application = await this.getApplicationById(id, userId);
    return this.prisma.smartApplication.update({
      where: { id },
      data: { status },
      include: {
        opportunity: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }

  async getStats(userId: string) {
    const [total, byStatus] = await Promise.all([
      this.prisma.smartApplication.count({
        where: { userId },
      }),
      this.prisma.smartApplication.groupBy({
        by: ['status'],
        where: { userId },
        _count: true,
      }),
    ]);

    const statusMap = {
      PENDING: 0,
      SHORTLISTED: 0,
      INTERVIEW: 0,
      OFFERED: 0,
      REJECTED: 0,
      WITHDRAWN: 0,
    };

    byStatus.forEach((item) => {
      statusMap[item.status] = item._count;
    });

    return {
      total,
      byStatus: statusMap,
    };
  }
}