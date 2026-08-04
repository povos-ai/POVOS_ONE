import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './services/dashboard.service';

@Module({
  imports: [PrismaModule],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}