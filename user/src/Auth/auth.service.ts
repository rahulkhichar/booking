import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpLoginResponseDto } from './dto/otp-login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private otpStore = new Map<string, string>(); // should be Redis or DB in prod

  constructor(private readonly jwtService: JwtService) {}

  async sendOtp(dto: RequestOtpDto) {
    const target = dto.email || dto.mobile;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpStore.set(target, otp);

    console.log(`OTP for ${target}: ${otp}`);
    // TODO: Integrate with email/SMS gateway
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<OtpLoginResponseDto> {
    const target = dto.email || dto.mobile;
    const savedOtp = this.otpStore.get(target);

    if (savedOtp !== dto.otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const user = {
      id: 'user-id-123',
      email: dto.email,
      mobile: dto.mobile,
      fullName: 'Rahul Khichar',
      role: 'EVENT_MANAGER' as const,
    };

    const accessToken = this.jwtService.sign({ sub: user.id, role: user.role });

    return {
      accessToken,
      user,
    };
  }
}
