import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsInt } from 'class-validator';

export class CreateResumeDto {
  @ApiProperty({ example: 'resume.pdf' })
  @IsString()
  fileName: string;

  @ApiProperty({ example: 'https://storage.com/resume.pdf' })
  @IsString()
  fileUrl: string;

  @ApiPropertyOptional({ example: 1024 })
  @IsOptional()
  @IsInt()
  fileSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  parsedText?: string;

  @ApiPropertyOptional()
  @IsOptional()
  skills?: any;

  @ApiPropertyOptional()
  @IsOptional()
  experience?: any;

  @ApiPropertyOptional()
  @IsOptional()
  education?: any;

  @ApiProperty({ example: 'cmsdgfc64000tk5rdtw8l09t9' })
  @IsString()
  workspaceId: string;
}