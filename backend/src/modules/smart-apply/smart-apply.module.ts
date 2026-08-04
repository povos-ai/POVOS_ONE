import { Module } from '@nestjs/common';
import { SmartApplyController } from './smart-apply.controller';
import { SmartApplyService } from './smart-apply.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SmartApplyController],
  providers: [SmartApplyService],
  exports: [SmartApplyService],
})
export class SmartApplyModule {}