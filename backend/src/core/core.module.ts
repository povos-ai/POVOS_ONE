import { Module, Global } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@Global()
@Module({
  imports: [AiModule, RecommendationModule],
  exports: [AiModule, RecommendationModule],
})
export class CoreModule {}