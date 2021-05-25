type OTPStore = { code: string | number; expires: number; type: string };

export class OTPHelper {
    private static readonly _otpMap = new Map<string, OTPStore>();

    static setOTP(phone: string, code: string | number, expires: number, type: string) {
        this._otpMap.set(phone, { code, expires, type });
    }

    static getOTP(phone: string) {
        return this._otpMap.get(phone);
    }

    static clearOTP(phone: string) {
        return this._otpMap.delete(phone);
    }
}
