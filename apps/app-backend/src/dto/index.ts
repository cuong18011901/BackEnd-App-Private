'use strict';

import { OTP_TYPE } from '@app/common';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class OTPTypeRequestDto {
    @IsString()
    readonly type: string;
}

export class OTPRequestDto {
    @IsOptional()
    @IsString()
    @IsPhoneNumber('VN')
    readonly phone: string;

    @IsNotEmpty()
    @IsEnum(OTP_TYPE)
    @IsString()
    readonly type: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    readonly email?: string;
}

export class PhoneRequestDto {
    @IsString()
    @IsPhoneNumber('VN')
    readonly phone: string;
}

export class SigninRequestDto extends PhoneRequestDto {
    @IsString()
    readonly passcode: string;
}

export class TokenPayloadDto {
    expiresIn: number;

    accessToken: string;

    constructor(accessToken: string, expiresIn: number) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
    }
}

export class SignupRequestDto extends PhoneRequestDto {
    @IsOptional()
    @IsString()
    readonly avatar: string;

    @IsNotEmpty()
    @IsString()
    readonly passcode: string;

    @IsNotEmpty()
    @IsString()
    readonly fullName: string;

    @IsString()
    readonly token: string;
}

export class AccountDto {
    id: number;
    phone: string;
    passcode: string;
    status: number;
    fullName: string;
}

export class VerifyOTPRequestDto extends OTPRequestDto {
    @IsNotEmpty()
    @IsString()
    otp: string;
}

export class ResetPasscodeRequestDto extends PhoneRequestDto {
    @IsNotEmpty()
    @IsString()
    readonly passcode: string;

    @IsString()
    readonly otp: string;
}
