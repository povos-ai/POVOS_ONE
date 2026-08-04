import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsArray, IsNumber } from "class-validator";

export class MatchRequestDto {
  @ApiProperty({ example: "user_123" })
  @IsString()
  userId: string;

  @ApiProperty({ example: "opportunity_456" })
  @IsString()
  entityId: string;

  @ApiProperty({ example: "job" })
  @IsString()
  entityType: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  userSkills?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  entitySkills?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  userExperience?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  requiredExperience?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  userEducation?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  requiredEducation?: string[];
}
