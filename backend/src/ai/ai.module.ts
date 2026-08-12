import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { EligibilityService } from './eligibility.service';
import { MatchingService } from './matching.service';

@Module({
  imports: [PrismaModule],
  controllers: [AiController],
  providers: [AiService, EligibilityService, MatchingService],
  exports: [EligibilityService, MatchingService],
})
export class AiModule {}
