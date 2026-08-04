import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { PrismaModule } from '../../database/prisma.module';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [PrismaModule, CoreModule],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}