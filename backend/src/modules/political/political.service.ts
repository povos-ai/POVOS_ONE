import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class PoliticalService {
  constructor(private readonly prisma: PrismaService) {}

  // ===== CAMPAIGN MANAGEMENT =====

  async createCampaign(userId: string, dto: CreateCampaignDto) {
    return this.prisma.campaign.create({
      data: {
        workspaceId: dto.workspaceId,
        userId,
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        type: dto.type,
        status: dto.status || 'DRAFT',
        startDate: dto.startDate ? new Date(dto.startDate) : null,
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        budget: dto.budget,
        location: dto.location,
        metadata: dto.metadata || {},
      },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async getCampaigns(workspaceId?: string) {
    const where: any = {};
    if (workspaceId) {
      where.workspaceId = workspaceId;
    }

    return this.prisma.campaign.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
        contents: {
          select: { id: true, title: true, type: true, status: true },
        },
        booths: {
          select: { id: true, name: true, location: true, volunteers: true },
        },
      },
    });
  }

  async getCampaignById(id: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
        contents: true,
        booths: true,
        mediaCoverages: true,
      },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
  }

  async updateCampaign(id: string, dto: UpdateCampaignDto) {
    await this.getCampaignById(id);

    return this.prisma.campaign.update({
      where: { id },
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        type: dto.type,
        status: dto.status,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        budget: dto.budget,
        location: dto.location,
        metadata: dto.metadata,
      },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async deleteCampaign(id: string) {
    await this.getCampaignById(id);
    await this.prisma.campaign.delete({ where: { id } });
    return { message: 'Campaign deleted successfully' };
  }

  // ===== CONTENT MANAGEMENT =====

  async createContent(userId: string, dto: CreateContentDto) {
    // Check if campaign exists
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: dto.campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${dto.campaignId} not found`);
    }

    return this.prisma.content.create({
      data: {
        campaignId: dto.campaignId,
        workspaceId: dto.workspaceId,
        userId,
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        type: dto.type,
        status: dto.status || 'DRAFT',
        content: dto.content,
        mediaUrl: dto.mediaUrl,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : null,
        metadata: dto.metadata || {},
      },
      include: {
        campaign: {
          select: { id: true, title: true, slug: true },
        },
      },
    });
  }

  async getContents(campaignId?: string) {
    const where: any = {};
    if (campaignId) {
      where.campaignId = campaignId;
    }

    return this.prisma.content.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        campaign: {
          select: { id: true, title: true, slug: true },
        },
      },
    });
  }

  async getContentById(id: string) {
    const content = await this.prisma.content.findUnique({
      where: { id },
      include: {
        campaign: {
          select: { id: true, title: true, slug: true },
        },
      },
    });

    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }

    return content;
  }

  async updateContent(id: string, dto: UpdateContentDto) {
    await this.getContentById(id);

    return this.prisma.content.update({
      where: { id },
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        type: dto.type,
        status: dto.status,
        content: dto.content,
        mediaUrl: dto.mediaUrl,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : undefined,
        metadata: dto.metadata,
      },
      include: {
        campaign: {
          select: { id: true, title: true, slug: true },
        },
      },
    });
  }

  async deleteContent(id: string) {
    await this.getContentById(id);
    await this.prisma.content.delete({ where: { id } });
    return { message: 'Content deleted successfully' };
  }

  // ===== BOOTH MANAGEMENT =====

  async createBooth(userId: string, campaignId: string, dto: any) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    return this.prisma.booth.create({
      data: {
        campaignId,
        workspaceId: dto.workspaceId,
        userId,
        name: dto.name,
        location: dto.location,
        address: dto.address,
        latitude: dto.latitude,
        longitude: dto.longitude,
        volunteers: dto.volunteers || 0,
        status: dto.status || 'ACTIVE',
        metadata: dto.metadata || {},
      },
    });
  }

  async getBooths(campaignId?: string) {
    const where: any = {};
    if (campaignId) {
      where.campaignId = campaignId;
    }

    return this.prisma.booth.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  // ===== MEDIA COVERAGE =====

  async createMediaCoverage(userId: string, campaignId: string, dto: any) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    return this.prisma.mediaCoverage.create({
      data: {
        campaignId,
        workspaceId: dto.workspaceId,
        userId,
        title: dto.title,
        source: dto.source,
        url: dto.url,
        publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : null,
        type: dto.type,
        metadata: dto.metadata || {},
      },
    });
  }

  async getMediaCoverages(campaignId?: string) {
    const where: any = {};
    if (campaignId) {
      where.campaignId = campaignId;
    }

    return this.prisma.mediaCoverage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }
}