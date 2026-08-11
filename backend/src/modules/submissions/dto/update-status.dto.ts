import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SubmissionStatus } from '@prisma/client';

export class UpdateStatusDto {
  @IsEnum(SubmissionStatus)
  status: SubmissionStatus;

  @IsOptional()
  @IsString()
  remarks?: string;
}
