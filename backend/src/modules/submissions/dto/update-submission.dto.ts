import { IsOptional } from 'class-validator';

export class UpdateSubmissionDto {
  @IsOptional()
  applicationData?: any;
}
