import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { CampaignType, CampaignStatus } from '@prisma/client';

export class CreateCampaignDto {
  @ApiProperty({ example: 'Bihar Election Campaign 2026' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'bihar-election-campaign-2026' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'Campaign for Bihar elections' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: CampaignType, example: CampaignType.ELECTION })
  @IsEnum(CampaignType)
  type: CampaignType;

  @ApiPropertyOptional({ enum: CampaignStatus, example: CampaignStatus.PLANNING })
  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @ApiPropertyOptional({ example: '2026-10-01T00:00:00Z' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-10-31T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: 1000000 })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiPropertyOptional({ example: 'Bihar' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;

  @ApiProperty({ example: 'cmsdgfc64000tk5rdtw8l09t9' })
  @IsString()
  workspaceId: string;
}