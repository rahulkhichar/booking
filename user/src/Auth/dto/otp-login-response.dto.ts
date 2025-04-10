export class OtpLoginResponseDto {
  accessToken: string;
  user: {
    id: string;
    email?: string;
    mobile?: string;
    role: 'PROPERTY_OWNER' | 'EVENT_MANAGER' | 'PARTICIPANT';
    fullName: string;
  };
}
