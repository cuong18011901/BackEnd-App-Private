import { Module } from '@nestjs/common';
import { PostRepo } from './post.repo';

@Module({
    providers: [PostRepo],
    exports: [PostRepo]
})
export class PostModule {}
