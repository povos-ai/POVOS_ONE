import { Injectable, NotFoundException } from '@nestjs/common';
import { AiService } from '../../core/ai/ai.service';
import { RecommendationService } from '../../core/recommendation/services/recommendation.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { SearchOpportunityDto } from './dto/search-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { OpportunityRepository } from './repositories/opportunity.repository';
import { OpportunitySearchRepository } from './repositories/opportunity-search.repository';

@Injectable()
export class OpportunityService {
  constructor(
    private readonly repository: OpportunityRepository,
    private readonly searchRepository: OpportunitySearchRepository,
    private readonly aiService: AiService,
    private readonly recommendationService: RecommendationService,
  ) {}

  health() {
    return {
      status: 'ok',
      module: 'Opportunity Module',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }

  async create(dto: CreateOpportunityDto) {
    console.log('========================================');
    console.log('CREATE OPPORTUNITY REQUEST');
    console.log('========================================');
    console.log(dto);

    const aiSummary =
      dto.aiSummary ??
      (await this.aiService.generateOpportunitySummary(dto.description));

    const opportunity = await this.repository.create({
      title: dto.title,
      slug: dto.slug,
      description: dto.description,
      type: dto.type,
      category: dto.category,
      level: dto.level,
      status: dto.status ?? 'DRAFT',
      published: dto.published ?? false,
      state: dto.state,
      district: dto.district,
      applicationUrl: dto.applicationUrl,
      startDate: dto.startDate ? new Date(dto.startDate) : null,
      lastDate: dto.lastDate ? new Date(dto.lastDate) : null,
      eligibility: dto.eligibility,
      benefits: dto.benefits,
      requiredDocuments: dto.requiredDocuments,
      aiSummary,
      metadata: dto.metadata,
      searchText: dto.searchText,
      workspace: {
        connect: {
          id: dto.workspaceId,
        },
      },
    });

    return opportunity;
  }

  async search(dto: SearchOpportunityDto) {
    console.log('🔍 Search request:', dto);
    return this.searchRepository.search(dto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const opportunity = await this.repository.findById(id);
    if (!opportunity) {
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    }
    return opportunity;
  }

  async findBySlug(slug: string) {
    const opportunity = await this.repository.findBySlug(slug);
    if (!opportunity) {
      throw new NotFoundException(`Opportunity with slug ${slug} not found`);
    }
    return opportunity;
  }

  async update(id: string, dto: UpdateOpportunityDto) {
    return this.repository.update(id, dto);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  // ===== RECOMMENDATION METHOD =====

  async getRecommendations(userId: string) {
    // ✅ Fixed: Method name case - getuserProfile (matching repository)
    const user = await this.repository.getuserProfile(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const opportunities = await this.repository.findActiveOpportunities({
      state: user?.state || undefined,
    });

    const items = opportunities.map((opp) => ({
      id: opp.id,
      title: opp.title,
      description: opp.description || '',
      category: opp.category,
      level: opp.level,
      state: opp.state || '',
    }));

    const recommendedIds = await this.recommendationService.recommend({
      userProfile: {
        state: user?.state || '',
        district: user?.district || '',
        metadata: (user?.metadata as Record<string, any>) || {},
      },
      items,
      limit: 10,
    });

    console.log('📌 Recommended IDs:', recommendedIds);

    if (recommendedIds.length === 0) {
      console.log('📌 No recommendations found');
      return [];
    }

    const opportunitiesList = await this.repository.findByIds(recommendedIds);
    
    console.log('📌 Found opportunities:', opportunitiesList.length);

    if (opportunitiesList.length === 0) {
      console.log('📌 Fallback: Returning all active opportunities');
      return this.repository.findActiveOpportunities({});
    }

    return opportunitiesList;
  }
}