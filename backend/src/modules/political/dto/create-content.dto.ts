import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ContentType, ContentStatus } from '@prisma/client';

export class CreateContentDto {
  @ApiProperty({ example: 'Vote for Progress Poster' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'vote-for-progress-poster' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'Poster for election campaign' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ContentType, example: ContentType.POSTER })
  @IsEnum(ContentType)
  type: ContentType;

  @ApiPropertyOptional({ enum: ContentStatus, example: ContentStatus.DRAFT })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @ApiPropertyOptional({ example: 'Content text here...' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: 'https://storage.com/image.jpg' })
  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @ApiPropertyOptional({ example: '2026-10-15T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;

  @ApiProperty({ example: 'cms...' })
  @IsString()
  campaignId: string;

  @ApiProperty({ example: 'cmsdgfc64000tk5rdtw8l09t9' })
  @IsString()
  workspaceId: string;
}