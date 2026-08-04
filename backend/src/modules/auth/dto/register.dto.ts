import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/, {
    message: 'Phone number must be a valid 10-digit Indian mobile number',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}