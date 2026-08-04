import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({ example: 'Job Application Template' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Template for job applications' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  data?: any;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @ApiProperty({ example: 'cmsdgfc64000tk5rdtw8l09t9' })
  @IsString()
  workspaceId: string;
}