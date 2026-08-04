import { Module, Global } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { AiModule } from '../ai/ai.module';
import { RecommendationService } from './services/recommendation.service';

@Global()
@Module({
  imports: [PrismaModule, AiModule],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationModule {}