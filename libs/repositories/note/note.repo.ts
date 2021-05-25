import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BaseClient } from '../base';

@Injectable()
export class NoteRepo extends BaseClient implements OnModuleInit, OnModuleDestroy {
    getInstance() {
        return this._client.account_note;
    }

    onModuleInit() {
        this._client.$connect();
    }

    onModuleDestroy() {
        this._client.$disconnect();
    }
}
