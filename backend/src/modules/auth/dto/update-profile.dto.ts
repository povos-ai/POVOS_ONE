import { IsOptional, IsString, IsPhoneNumber, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: "User's first name",
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  @MinLength(1, { message: 'First name must be at least 1 character long' })
  @MaxLength(50, { message: 'First name cannot exceed 50 characters' })
  firstName?: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  @MinLength(1, { message: 'Last name must be at least 1 character long' })
  @MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
  lastName?: string;

  @ApiProperty({
    description: "User's phone number (10-digit Indian number)",
    example: '9876543210',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber('IN', { message: 'Please enter a valid 10-digit Indian mobile number' })
  phone?: string;
}