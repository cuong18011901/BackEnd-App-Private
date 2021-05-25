import { Module } from '@nestjs/common';
import { NoteRepo } from './note.repo';

@Module({
    providers: [NoteRepo],
    exports: [NoteRepo]
})
export class NoteModule {}
