import { account } from '@prisma/client';

export type Account = account;

export interface OTPRequestDto {
    email: string;
    phone: string;
    type: string;
}

export interface VerifyOTPRequestDto {
    email: string;
    phone: string;
    otp: string;
    type: string;
    token: string;
}

export interface ResetPasscodeRequestDto extends Account {
    token: string;
    phone: string;
}

export interface TokenPayloadDto {
    expiresIn: number;
    accessToken: string;
}
