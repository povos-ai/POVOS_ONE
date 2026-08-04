import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsInt, Min, IsDateString, IsBooleanString } from 'class-validator';
import { Type } from 'class-transformer';
import { OpportunityCategory, OpportunityType, OpportunityStatus, OpportunityLevel } from '@prisma/client';

export class SearchOpportunityDto {
  @ApiPropertyOptional({
    description: 'Search by title or description',
    example: 'startup grant',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: OpportunityCategory,
    description: 'Filter by category',
    example: OpportunityCategory.SCHEME,
  })
  @IsOptional()
  @IsEnum(OpportunityCategory)
  category?: OpportunityCategory;

  @ApiPropertyOptional({
    enum: OpportunityType,
    description: 'Filter by type',
    example: OpportunityType.GRANT,
  })
  @IsOptional()
  @IsEnum(OpportunityType)
  type?: OpportunityType;

  @ApiPropertyOptional({
    enum: OpportunityStatus,
    description: 'Filter by status',
    example: OpportunityStatus.PUBLISHED,
  })
  @IsOptional()
  @IsEnum(OpportunityStatus)
  status?: OpportunityStatus;

  @ApiPropertyOptional({
    enum: OpportunityLevel,
    description: 'Filter by level',
    example: OpportunityLevel.STATE,
  })
  @IsOptional()
  @IsEnum(OpportunityLevel)
  level?: OpportunityLevel;

  @ApiPropertyOptional({
    description: 'Filter by state',
    example: 'Bihar',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    description: 'Filter by district',
    example: 'Patna',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    description: 'Filter by workspace name',
    example: 'Bihar Startup Mission',
  })
  @IsOptional()
  @IsString()
  workspaceName?: string;

  @ApiPropertyOptional({
    description: 'Filter by published status',
    example: true,
  })
  @IsOptional()
  @IsBooleanString()
  published?: string;

  @ApiPropertyOptional({
    description: 'Filter by start date (ISO format)',
    example: '2026-01-01',
  })
  @IsOptional()
  @IsDateString()
  startDateFrom?: string;

  @ApiPropertyOptional({
    description: 'Filter by end date (ISO format)',
    example: '2026-12-31',
  })
  @IsOptional()
  @IsDateString()
  startDateTo?: string;

  @ApiPropertyOptional({
    description: 'Page number (1-indexed)',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Sort field',
    example: 'createdAt',
    enum: ['createdAt', 'updatedAt', 'title', 'lastDate'],
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'desc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}