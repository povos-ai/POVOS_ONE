import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SubmitBusinessDto {
  @ApiProperty({ example: 'cmse...' })
  @IsString()
  businessId: string;

  @ApiPropertyOptional()
  @IsOptional()
  data?: any;

  @ApiProperty({ example: 'cmsdgfc64000tk5rdtw8l09t9' })
  @IsString()
  workspaceId: string;
}