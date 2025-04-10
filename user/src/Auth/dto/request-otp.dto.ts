import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class RequestOtpDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber('IN') // or 'US' / default region
  mobile?: string;
}
