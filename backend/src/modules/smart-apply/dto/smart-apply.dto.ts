import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class SmartApplyDto {
  @ApiProperty({ example: 'cms...' })
  @IsString()
  opportunityId: string;

  @ApiPropertyOptional({ example: 'cms...' })
  @IsOptional()
  @IsString()
  templateId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  data?: any;

  @ApiProperty({ example: 'cmsdgfc64000tk5rdtw8l09t9' })
  @IsString()
  workspaceId: string;
}

export class BulkApplyDto {
  @ApiProperty({ example: ['cms...', 'cms...'] })
  @IsArray()
  @IsString({ each: true })
  opportunityIds: string[];

  @ApiPropertyOptional({ example: 'cms...' })
  @IsOptional()
  @IsString()
  templateId?: string;

  @ApiProperty({ example: 'cmsdgfc64000tk5rdtw8l09t9' })
  @IsString()
  workspaceId: string;
}