import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BaseClient } from '../base';

@Injectable()
export class WalletRepo extends BaseClient implements OnModuleInit, OnModuleDestroy {
    getInstance() {
        return this._client.account_spending;
    }

    getExpense() {
        return this._client.account_expense;
    }

    onModuleInit() {
        this._client.$connect();
    }

    onModuleDestroy() {
        this._client.$disconnect();
    }
}
