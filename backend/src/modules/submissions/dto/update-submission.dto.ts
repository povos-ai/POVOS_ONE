import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { SubmissionStatus } from '@prisma/client';

export class UpdateSubmissionDto {
  @ApiPropertyOptional({
    enum: SubmissionStatus,
  })
  @IsOptional()
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;

  @ApiPropertyOptional({
    example: { 
      experience: '3 years',
      skills: ['Node.js', 'React'],
    },
  })
  @IsOptional()
  data?: Record<string, any>;
}