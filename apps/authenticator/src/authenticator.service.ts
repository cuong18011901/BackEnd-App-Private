import { CachingService } from '@app/caching';
import { AppError } from '@app/common';
import { OTPService } from '@app/otp';
import { AccountRepo } from '@app/repositories';
import { UtilsService } from '@app/utils';
import { Injectable } from '@nestjs/common';
import { Account, OTPRequestDto, ResetPasscodeRequestDto, VerifyOTPRequestDto } from './dto';

@Injectable()
export class AuthenticatorService {
    constructor(
        private readonly _account: AccountRepo,
        private readonly _otp: OTPService,
        private readonly _utils: UtilsService,
        private readonly _caching: CachingService
    ) {}

    async getAccountByPhone(phone: string): Promise<Account> {
        const key = this._utils.toIntlPhone(phone);
        let account = await this._caching.get(key);
        if (account) return account as Account;
        else {
            account = await this._account.getInstance().findFirst({
                where: { phone: this._utils.toIntlPhone(phone) },
                select: { id: true, phone: true, passcode: true, status: true, fullName: true }
            });
            this._caching.set(key, account, 30);
            return account as Account;
        }
    }

    async saveAccount(input: Account & VerifyOTPRequestDto) {
        const { token, ...account } = input;
        delete account.id;
        const phone = this._utils.toIntlPhone(account.phone);
        if (await this._caching.get(token)) {
            account.passcode = this._utils.hashValue(account.passcode);
            account.phone = phone;

            try {
                const createOperator = this._account.getInstance().create({
                    data: { ...account },
                    select: { id: true, phone: true, status: true, fullName: true }
                });
                const [output] = await this._account.transaction([createOperator]);
                this._caching.remove(token);
                return output;
            } catch (e) {
                return new AppError('ERR', 'Error saving account');
            }
        } else {
            return new AppError('TOKEN', 'Token not valid');
        }
    }

    async processOTP(input: OTPRequestDto) {
        const { phone, email, type } = input;
        const key = email ? email : this._utils.toIntlPhone(phone);
        const otp = this._otp.generateOTP(key, type);

        if (email) {
            // TODO-1 setup Sendgrid account
            // TODO-2 send OTP to email address
            console.log(`otp, email`, otp, email);
        }
        return otp;
    }

    async checkOTP(input: VerifyOTPRequestDto) {
        const { otp, phone, email, type } = input;
        const key = email ? email : this._utils.toIntlPhone(phone);

        // generate transaction token
        const valid = this._otp.verifyOTP(key, otp, type);
        if (valid) {
            const token = this._utils.hashValue(`${key}${otp}${type}`);
            this._caching.set(token, true, this._otp.getExpires(type));
            return token;
        }
        return valid;
    }

    async resetPasscode(input: ResetPasscodeRequestDto) {
        const { passcode, phone, token } = input;
        const key = this._utils.toIntlPhone(phone);
        if (await this._caching.get(token)) {
            const output = this._account.getInstance().update({
                where: { phone: key },
                data: { passcode: this._utils.hashValue(passcode) },
                select: { phone: true, updatedAt: true }
            });
            this._caching.remove(token);
            return output;
        } else {
            return new AppError('TOKEN', 'Token not valid');
        }
    }

    async signIn(phone: string, passcode: string): Promise<Account> {
        const account = await this.getAccountByPhone(phone);
        if (account && this._utils.compareHash(passcode, account.passcode)) {
            return account;
        }
        return null;
    }
}
