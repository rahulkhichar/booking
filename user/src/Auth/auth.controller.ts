import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpLoginResponseDto } from './dto/otp-login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  async requestOtp(@Body() dto: RequestOtpDto): Promise<{ message: string }> {
    await this.authService.sendOtp(dto);
    return { message: 'OTP sent successfully' };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto): Promise<OtpLoginResponseDto> {
    return await this.authService.verifyOtp(dto);
  }
}
