// 'use strict';

// import {
//     CreateDateColumn,
//     PrimaryGeneratedColumn,
//     UpdateDateColumn,
// } from 'typeorm';

// import { UtilsService } from '../providers/utils.service';
// import { AbstractDto } from './dto/AbstractDto';

// export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @CreateDateColumn({
//         type: 'timestamp without time zone',
//         name: 'created_at',
//         nullable: true,
//     })
//     createdAt?: Date;

//     @UpdateDateColumn({
//         type: 'timestamp without time zone',
//         name: 'updated_at',
//         nullable: true,
//         default: null,
//     })
//     updatedAt?: Date;

//     @UpdateDateColumn({
//         type: Boolean,
//         name: 'active',
//         nullable: true,
//         default: null,
//     })
//     active?: boolean;

//     abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

//     toDto(options?: any) {
//         return UtilsService.toDto(this.dtoClass, this, options);
//     }
// }
