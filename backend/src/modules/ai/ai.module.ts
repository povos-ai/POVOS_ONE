import { Module } from '@nestjs/common';
import { AuthModule } from '../../auth/auth.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { MatchingService } from './matching.service';
import { EligibilityService } from './eligibility.service';
import { GeminiService } from './gemini.service';
import { PersonalizationService } from './personalization.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AiController],
  providers: [AiService, MatchingService, EligibilityService, GeminiService, PersonalizationService],
  exports: [AiService, MatchingService, GeminiService, PersonalizationService],
})
export class AiModule {}
