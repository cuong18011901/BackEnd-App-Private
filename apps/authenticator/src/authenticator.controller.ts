import { MESSAGE_PATTERN } from '@app/common';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthenticatorService } from './authenticator.service';
import { Account, OTPRequestDto, ResetPasscodeRequestDto, VerifyOTPRequestDto } from './dto';

@Controller()
export class AuthenticatorController {
    private readonly _logger: Logger = new Logger('AuthenticatorController');

    constructor(private readonly _service: AuthenticatorService) {}

    @MessagePattern(MESSAGE_PATTERN.AUTH.FIND_ACCOUNT)
    async findAccount(phone: string) {
        this._logger.log(`findAccount - invoked, phone: ${phone}`);
        return this._service.getAccountByPhone(phone);
    }

    @MessagePattern(MESSAGE_PATTERN.AUTH.SIGN_UP)
    async signup(body: Account & VerifyOTPRequestDto) {
        this._logger.log(`signup - invoked`);
        return this._service.saveAccount(body);
    }

    @MessagePattern(MESSAGE_PATTERN.AUTH.REQUEST_OTP)
    async requestOTP(body: OTPRequestDto) {
        this._logger.log(`requestOTP - invoked`);
        return this._service.processOTP(body);
    }

    @MessagePattern(MESSAGE_PATTERN.AUTH.VERIFY_OTP)
    async verifyOTP(body: VerifyOTPRequestDto) {
        this._logger.log(`verifyOTP - invoked`);
        return this._service.checkOTP(body);
    }

    @MessagePattern(MESSAGE_PATTERN.AUTH.RESET_PASSCODE)
    async resetPasscode(body: ResetPasscodeRequestDto) {
        this._logger.log(`resetPasscode - invoked`);
        return this._service.resetPasscode(body);
    }

    @MessagePattern(MESSAGE_PATTERN.AUTH.SIGN_IN)
    async signIn(body: Account): Promise<Account> {
        this._logger.log(`signIn - invoked`);
        return this._service.signIn(body.phone, body.passcode);
    }
}
