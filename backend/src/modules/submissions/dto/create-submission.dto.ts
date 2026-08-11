import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubmissionDto {
  @IsUUID()
  @IsNotEmpty()
  opportunityId: string;

  @IsOptional()
  applicationData?: any;
}
