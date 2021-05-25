import { Module } from '@nestjs/common';
import { SpendRepo } from './spend.repo';

@Module({
    providers: [SpendRepo],
    exports: [SpendRepo]
})
export class SpendModule {}
