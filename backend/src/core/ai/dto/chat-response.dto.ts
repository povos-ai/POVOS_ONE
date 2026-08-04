import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageDto {
  @ApiProperty({
    example: 'assistant',
  })
  role: string;

  @ApiProperty({
    example: 'Hello! How can I help you today?',
  })
  content: string;
}

export class ChatResponseDto {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    example: '9d74a7d4-7c89-4b8b-b7c6-0d2c7f2b7f42',
  })
  conversationId: string;

  @ApiProperty({
    example: 'gemini',
  })
  provider: string;

  @ApiProperty({
    example: 'gemini-2.5-pro',
  })
  model: string;

  @ApiProperty({
    example: 523,
  })
  latency: number;

  @ApiProperty({
    example: '2026-07-30T12:00:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    type: ChatMessageDto,
  })
  message: ChatMessageDto;
}