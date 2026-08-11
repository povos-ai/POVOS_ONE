import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';
import { AiService } from '../ai/ai.service';

@Injectable()
export class OpportunitiesService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async create(data: Prisma.OpportunityCreateInput) {
    const opportunity = await this.prisma.opportunity.create({ data });
    this.analyzeOpportunity(opportunity.id).catch(err =>
      console.error('AI analysis failed:', err.message)
    );
    return opportunity;
  }

  private async analyzeOpportunity(id: string) {
    const opp = await this.prisma.opportunity.findUnique({ where: { id } });
    if (!opp) return;
    const analysis = await this.aiService.generateOpportunityIntelligence(opp);
    await this.prisma.opportunity.update({
      where: { id },
      data: {
        aiSummary: analysis.summary,
        aiEligibility: analysis.eligibility,
        aiBenefits: analysis.benefits,
        aiDocuments: analysis.requiredDocuments,
        aiApplicationProcess: analysis.applicationProcess,
        aiTargetUsers: analysis.targetUsers,
        aiTags: analysis.tags,
        aiGeneratedAt: new Date(),
        aiModel: 'gemini-2.0-flash',
      },
    });
  }

  async findAll() {
    return this.prisma.opportunity.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.opportunity.findUnique({ where: { id } });
  }

  async findBySlug(slug: string) {
    return this.prisma.opportunity.findUnique({ where: { slug } });
  }

  async update(id: string, data: Prisma.OpportunityUpdateInput) {
    return this.prisma.opportunity.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.opportunity.delete({ where: { id } });
  }

  async search(filters: {
    title?: string;
    category?: string;
    type?: string;
    state?: string;
    district?: string;
    status?: string;
  }) {
    return this.prisma.opportunity.findMany({
      where: {
        title: filters.title ? { contains: filters.title, mode: 'insensitive' } : undefined,
        category: filters.category as any,
        type: filters.type as any,
        state: filters.state,
        district: filters.district,
        status: filters.status as any,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
