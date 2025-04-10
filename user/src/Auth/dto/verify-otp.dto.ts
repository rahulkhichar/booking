import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()
  otp: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber('IN')
  mobile?: string;
}
