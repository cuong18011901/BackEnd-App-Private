import { Module } from '@nestjs/common';
import { WalletRepo } from './wallet.repo';

@Module({
    providers: [WalletRepo],
    exports: [WalletRepo]
})
export class WalletModule {}
