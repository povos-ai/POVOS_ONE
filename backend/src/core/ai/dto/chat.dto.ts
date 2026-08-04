import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ChatDto {
  @ApiProperty({
    example: 'Hello Gemini',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  message: string;

  @ApiPropertyOptional({
    example: 'You are a helpful AI assistant.',
  })
  @IsOptional()
  @IsString()
  systemPrompt?: string;
}