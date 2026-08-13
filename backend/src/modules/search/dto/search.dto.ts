import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({ required: false })
  q?: string;

  @ApiProperty({ required: false })
  category?: string;

  @ApiProperty({ required: false })
  type?: string;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  state?: string;

  @ApiProperty({ required: false })
  district?: string;

  @ApiProperty({ required: false })
  workspaceId?: string;

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false })
  sortBy?: string;

  @ApiProperty({ required: false })
  sortOrder?: 'asc' | 'desc';
}
