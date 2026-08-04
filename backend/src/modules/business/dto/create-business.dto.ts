import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { BusinessType, BusinessCategory, BusinessStatus } from '@prisma/client';

export class CreateBusinessDto {
  @ApiProperty({ example: 'Road Construction Tender 2026' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'road-construction-tender-2026' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Construction of 50km road in Bihar' })
  @IsString()
  description: string;

  @ApiProperty({ enum: BusinessType, example: BusinessType.TENDER })
  @IsEnum(BusinessType)
  type: BusinessType;

  @ApiProperty({ enum: BusinessCategory, example: BusinessCategory.CONSTRUCTION })
  @IsEnum(BusinessCategory)
  category: BusinessCategory;

  @ApiPropertyOptional({ example: 'Infrastructure' })
  @IsOptional()
  @IsString()
  sector?: string;

  @ApiPropertyOptional({ example: 'Patna, Bihar' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 5000000 })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiPropertyOptional({ enum: BusinessStatus, example: BusinessStatus.PUBLISHED })
  @IsOptional()
  @IsEnum(BusinessStatus)
  status?: BusinessStatus;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  published?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;

  @ApiProperty({ example: 'cmsdgfc64000tk5rdtw8l09t9' })
  @IsString()
  workspaceId: string;
}