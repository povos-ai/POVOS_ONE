import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';
import { AiModule } from '../../core/ai/ai.module';

import { OpportunityController } from './opportunity.controller';
import { OpportunityService } from './opportunity.service';
import { OpportunityIntelligenceService } from './services/opportunity-intelligence.service';

import { OpportunityRepository } from './repositories/opportunity.repository';
import { OpportunitySearchRepository } from './repositories/opportunity-search.repository';

@Module({
  imports: [
    PrismaModule,
    AiModule,
  ],

  controllers: [
    OpportunityController,
  ],

  providers: [
    OpportunityService,
    OpportunityRepository,
    OpportunitySearchRepository,
    OpportunityIntelligenceService,
  ],

  exports: [
    OpportunityService,
    OpportunityRepository,
    OpportunitySearchRepository,
    OpportunityIntelligenceService,
  ],
})
export class OpportunityModule {}