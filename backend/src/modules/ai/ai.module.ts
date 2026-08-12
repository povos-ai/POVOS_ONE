import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../prisma/prisma.module';
import { MatchingService } from './matching.service';
import { EligibilityService } from './eligibility.service';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [AiController],
  providers: [AiService, MatchingService, EligibilityService],
  exports: [AiService, MatchingService, EligibilityService],
})
export class AiModule {}
