import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';

import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { SubmissionRepository } from './repositories/submission.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SubmissionController],
  providers: [
    SubmissionService,
    SubmissionRepository,
  ],
  exports: [
    SubmissionService,
    SubmissionRepository,
  ],
})
export class SubmissionModule {}