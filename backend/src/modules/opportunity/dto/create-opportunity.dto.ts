import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import {
  OpportunityCategory,
  OpportunityLevel,
  OpportunityStatus,
  OpportunityType,
} from '@prisma/client';

export class CreateOpportunityDto {
  @ApiProperty({
    example: 'Bihar Startup Seed Fund Scheme',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'bihar-startup-seed-fund-scheme',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: 'Financial assistance for eligible startups.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: OpportunityType,
    example: OpportunityType.SCHEME,
  })
  @IsEnum(OpportunityType)
  type: OpportunityType;

  @ApiProperty({
    enum: OpportunityCategory,
    example: OpportunityCategory.SCHEME,
  })
  @IsEnum(OpportunityCategory)
  category: OpportunityCategory;

  @ApiProperty({
    enum: OpportunityLevel,
  })
  @IsEnum(OpportunityLevel)
  level: OpportunityLevel;

  @ApiPropertyOptional({
    enum: OpportunityStatus,
    default: OpportunityStatus.DRAFT,
  })
  @IsOptional()
  @IsEnum(OpportunityStatus)
  status?: OpportunityStatus;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiPropertyOptional({
    example: 'Bihar',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    example: 'Patna',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    example: 'https://startup.bihar.gov.in',
  })
  @IsOptional()
  @IsUrl()
  applicationUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  lastDate?: string;

  @ApiPropertyOptional({
    example: {
      age: '18+',
      startup: true,
    },
  })
  @IsOptional()
  eligibility?: Record<string, any>;

  @ApiPropertyOptional({
    example: {
      grant: '₹10 Lakhs',
    },
  })
  @IsOptional()
  benefits?: Record<string, any>;

  @ApiPropertyOptional({
    example: ['PAN', 'Aadhaar', 'Certificate'],
  })
  @IsOptional()
  requiredDocuments?: any;

  @ApiPropertyOptional({
    example: 'AI generated summary...',
  })
  @IsOptional()
  @IsString()
  aiSummary?: string;

  @ApiPropertyOptional({
    example: 'startup grant bihar funding subsidy',
  })
  @IsOptional()
  @IsString()
  searchText?: string;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiProperty({
    example: 'workspace_id_here',
  })
  @IsString()
  workspaceId: string;
}