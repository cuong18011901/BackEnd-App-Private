import { OTP_TYPE } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { OTPHelper } from './helper/otp.helper';

const EXPIRES = 2 * 60000; //expires in 2 minutes

const TOKEN_EXPIRES = {
    [OTP_TYPE.USER]: 10 * 6000, // 10 minutes
    [OTP_TYPE.PAYMENT]: 10 * 6000, // 10 minutes
    [OTP_TYPE.RESET_PASSCODE]: 10 * 6000, // 10 minutes
    [OTP_TYPE.SIGN_UP]: 30 * 6000 // 10 minutes
};

@Injectable()
export class OTPService {
    private readonly _logger = new Logger('OTPService');

    constructor() {
        // TODO inject third party service
    }

    generateOTP(key: string, type: string) {
        if (OTPHelper.getOTP(key)) return;
        // generate OTP code
        const otp = Math.floor(Math.random() * 899999 + 100000);

        // save OTP to temporary cache for verifying later
        const expires = new Date().getTime() + EXPIRES;
        OTPHelper.setOTP(key, otp, expires, type);
        setTimeout(() => {
            this._logger.log(`Clear expired OTP from phone: ${key}`);
            OTPHelper.clearOTP(key);
        }, EXPIRES);

        this._logger.log(`OTP: ${otp}`);
        // TODO-3 dispatch OTP code to third party
        return otp;
    }

    verifyOTP(key: string, code: string | number, type: string) {
        // get OTP from temporary cache
        const otp = OTPHelper.getOTP(key);

        const valid = otp && `${otp.code}` === `${code}` && otp.expires > new Date().getTime() && otp.type === type;
        if (valid)
            setTimeout(() => {
                this._logger.log(`Clear OTP from phone: ${key}`);
                OTPHelper.clearOTP(key);
            }, 100);

        return valid;
    }

    getExpires(type: string) {
        return TOKEN_EXPIRES[type];
    }
}
