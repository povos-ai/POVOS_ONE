import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsInt, Min, IsDateString, IsBooleanString } from 'class-validator';
import { Type } from 'class-transformer';
// Prisma enums removed – using string types

export class SearchOpportunityDto {
  @ApiPropertyOptional({
    description: 'Search by title or description',
    example: 'startup grant'})
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({

    description: 'Filter by category'})
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({

    description: 'Filter by type'})
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({

    description: 'Filter by status'})
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({

    description: 'Filter by level'})
  @IsOptional()
  level?: string;

  @ApiPropertyOptional({
    description: 'Filter by state',
    example: 'Bihar'})
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    description: 'Filter by district',
    example: 'Patna'})
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    description: 'Filter by workspace name',
    example: 'Bihar Startup Mission'})
  @IsOptional()
  @IsString()
  workspaceName?: string;

  @ApiPropertyOptional({
    description: 'Filter by published status',
    example: true})
  @IsOptional()
  @IsBooleanString()
  published?: string;

  @ApiPropertyOptional({
    description: 'Filter by start date (ISO format)',
    example: '2026-01-01'})
  @IsOptional()
  @IsDateString()
  startDateFrom?: string;

  @ApiPropertyOptional({
    description: 'Filter by end date (ISO format)',
    example: '2026-12-31'})
  @IsOptional()
  @IsDateString()
  startDateTo?: string;

  @ApiPropertyOptional({
    description: 'Page number (1-indexed)',
    example: 1,
    default: 1})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 10,
    default: 10})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Sort field',
    example: 'createdAt',
    enum: ['createdAt', 'updatedAt', 'title', 'lastDate']})
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'desc',
    enum: ['asc', 'desc']})
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}

