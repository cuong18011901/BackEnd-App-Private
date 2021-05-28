import { CachingModule } from '@app/caching';
import { BillModule, CategoryModule } from '@app/repositories';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [CategoryModule, BillModule, CachingModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
