import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { PlannerType, Priority, PlannerStatus } from '@prisma/client';

export class CreatePlannerDto {
  @ApiProperty({ example: 'Submit Bihar Startup Grant Application' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Complete the application form' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: PlannerType, example: PlannerType.DEADLINE })
  @IsEnum(PlannerType)
  type: PlannerType;

  @ApiPropertyOptional({ enum: Priority, example: Priority.HIGH })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiPropertyOptional({ enum: PlannerStatus, example: PlannerStatus.PENDING })
  @IsOptional()
  @IsEnum(PlannerStatus)
  status?: PlannerStatus;

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({ example: '2026-12-30T09:00:00Z' })
  @IsOptional()
  @IsDateString()
  reminderAt?: string;

  @ApiPropertyOptional({ example: { applicationId: 'cms...' } })
  @IsOptional()
  metadata?: any;

  @ApiProperty({ example: 'cmsdgfc64000tk5rdtw8l09t9' })
  @IsString()  // ✅ Changed from @IsUUID()
  workspaceId: string;
}