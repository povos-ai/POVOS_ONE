import { ApiProperty } from '@nestjs/swagger';

export class CreateOpportunityDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  slug?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  category?: string;

  @ApiProperty({ required: false })
  type?: string;

  @ApiProperty({ required: false })
  level?: string;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  state?: string;

  @ApiProperty({ required: false })
  district?: string;

  @ApiProperty({ required: false })
  lastDate?: string;

  @ApiProperty({ required: false })
  startDate?: string;

  @ApiProperty({ required: false })
  aiEligibility?: any;

  @ApiProperty({ required: false })
  workspaceId?: string;

  @ApiProperty({ required: false })
  providerId?: string;
}
