import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({
    enum: [
      'DRAFT',
      'SUBMITTED',
      'UNDER_REVIEW',
      'DOCUMENT_REQUIRED',
      'APPROVED',
      'REJECTED',
      'WITHDRAWN',
    ],
  })
  status: string;

  @ApiPropertyOptional({
    description: 'Optional remarks associated with the status update',
  })
  remarks?: string;
}