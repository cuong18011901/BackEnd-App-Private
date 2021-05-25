import { OTPRequest } from './request-otp';
import { ResetPasscodeRequest } from './reset-passcode';
import { SigninRequest, SigninResponse } from './sign-in';
import { SignupRequest, SignupResponse } from './sign-up';
import { VerifyOTPRequest } from './verify-otp';

export const AuthSchema = {
    OTPRequest,
    SigninRequest,
    SigninResponse,
    SignupRequest,
    SignupResponse,
    VerifyOTPRequest,
    ResetPasscodeRequest
};
