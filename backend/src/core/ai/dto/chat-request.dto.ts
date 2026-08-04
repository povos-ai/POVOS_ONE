import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ChatRequestDto {
  @ApiProperty({
    example: 'Hello Gemini',
  })
  @IsString()
  message: string;

  @ApiProperty({
    required: false,
    example: 'You are a helpful AI assistant.',
  })
  @IsOptional()
  @IsString()
  systemPrompt?: string;
}