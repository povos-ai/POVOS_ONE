import { ApiProperty } from '@nestjs/swagger';
import { SubmissionStatus } from '@prisma/client';

export class SubmissionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: SubmissionStatus;

  @ApiProperty()
  submittedAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  opportunityId: string;

  @ApiProperty()
  data: Record<string, any>;

  @ApiProperty({ required: false })
  user?: any;

  @ApiProperty({ required: false })
  opportunity?: any;
}