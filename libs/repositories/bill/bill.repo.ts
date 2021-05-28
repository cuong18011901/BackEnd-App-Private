import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BaseClient } from '../base';

@Injectable()
export class BillRepo extends BaseClient implements OnModuleInit, OnModuleDestroy {
    getInstance() {
        return this._client.account_bill;
    }

    getBillItem() {
        return this._client.bill_item;
    }

    onModuleInit() {
        this._client.$connect();
    }

    onModuleDestroy() {
        this._client.$disconnect();
    }
}
