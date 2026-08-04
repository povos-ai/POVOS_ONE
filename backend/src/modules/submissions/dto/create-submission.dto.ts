import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { SubmissionStatus } from '@prisma/client';

export class CreateSubmissionDto {
  @ApiProperty({
    example: 'cms7wtwg00005lcl4zptdan8m',
    description: 'ID of the opportunity being applied for',
  })
  @IsString()
  opportunityId: string;

  @ApiProperty({
    example: 'cms7xyz123456',
    description: 'ID of the user applying',
  })
  @IsString()
  userId: string;

  @ApiPropertyOptional({
    enum: SubmissionStatus,
    default: SubmissionStatus.DRAFT,
  })
  @IsOptional()
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;

  @ApiPropertyOptional({
    example: { 
      experience: '3 years',
      skills: ['Node.js', 'React'],
      coverLetter: 'I am interested in this opportunity...'
    },
    description: 'Additional application data',
  })
  @IsOptional()
  data?: Record<string, any>;
}