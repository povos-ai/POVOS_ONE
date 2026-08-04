import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}