import { PathsObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { CheckOperation } from './check-phone';
import { RequestOTPOperation } from './request-otp';
import { ResetPasscodeOperation } from './reset-passcode';
import { SigninOperation } from './sign-in';
import { SignupOperation } from './sign-up';
import { VerifyOTPOperation } from './verify-otp';

export const AuthPaths: PathsObject = {
    '/auth/check/:phone': { get: CheckOperation },
    '/auth/request-otp': { post: RequestOTPOperation },
    '/auth/verify-otp': { post: VerifyOTPOperation },
    '/auth/sign-in': { post: SigninOperation },
    '/auth/sign-up': { post: SignupOperation },
    '/auth/reset-passcode': { patch: ResetPasscodeOperation }
};
