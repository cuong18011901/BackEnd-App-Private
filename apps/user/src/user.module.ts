import { CachingModule } from '@app/caching';
import { CategoryModule as CategoryRepoModule, NoteModule, PostModule as PostRepoModule, WalletModule } from '@app/repositories';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [CategoryRepoModule, PostRepoModule, NoteModule, WalletModule, CachingModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
