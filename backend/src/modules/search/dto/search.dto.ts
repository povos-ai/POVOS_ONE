import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { OpportunityCategory, OpportunityType, OpportunityStatus, OpportunityLevel } from '@prisma/client';

export class SearchDto {
  @ApiPropertyOptional({
    description: 'Search query (title, description, category)',
    example: 'startup grant',
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional({
    description: 'Workspace ID to search within',
    example: 'cms...',
  })
  @IsOptional()
  @IsString()
  workspaceId?: string;

  @ApiPropertyOptional({
    enum: OpportunityCategory,
    description: 'Filter by category',
    example: OpportunityCategory.STARTUP,
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
    description: 'Page number (default: 1)',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page (default: 10, max: 100)',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Sort by field',
    example: 'createdAt',
    enum: ['createdAt', 'updatedAt', 'title', 'lastDate', 'views'],
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