import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ApplyJobDto {
  @ApiProperty({ example: 'cmse4qn4s000212j229yem42z' })
  @IsString()  // ✅ Changed from @IsUUID()
  jobId: string;

  @ApiPropertyOptional({ example: 'I am interested in this position...' })
  @IsOptional()
  @IsString()
  coverLetter?: string;

  @ApiProperty({ example: 'cmsdgfc64000tk5rdtw8l09t9' })
  @IsString()
  workspaceId: string;
}