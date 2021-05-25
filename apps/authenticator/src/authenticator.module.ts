import { CachingModule } from '@app/caching';
import { OTPModule } from '@app/otp';
import { AccountModule } from '@app/repositories';
import { UtilsModule } from '@app/utils';
import { Module } from '@nestjs/common';
import { AuthenticatorController } from './authenticator.controller';
import { AuthenticatorService } from './authenticator.service';

@Module({
    imports: [AccountModule, OTPModule, UtilsModule, CachingModule],
    controllers: [AuthenticatorController],
    providers: [AuthenticatorService]
})
export class AuthenticatorModule {}
