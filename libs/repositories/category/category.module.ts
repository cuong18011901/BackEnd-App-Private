import { Module } from '@nestjs/common';
import { CategoryRepo } from './category.repo';

@Module({
    providers: [CategoryRepo],
    exports: [CategoryRepo]
})
export class CategoryModule {}
