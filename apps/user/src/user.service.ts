import { AppError } from '@app/common';
import { BillRepo, CategoryRepo } from '@app/repositories';
import { Injectable } from '@nestjs/common';
import { RequestParamDto } from '../dto';

@Injectable()
export class UserService {
    constructor(private readonly _category: CategoryRepo, private readonly _bill: BillRepo) {}

    async getUser(accountId: number) {
        const output = {
            accountId,
            category: await this._category.getInstance().findMany({
                where: { accountId, deleteAt: null },
                select: { id: true, code: true, name: true, createdAt: true, updatedAt: true },
                orderBy: { createdAt: 'desc' }
            }),
            bill: await this._bill.getInstance().findMany({
                where: { accountId, deleteAt: null },
                select: { id: true, code: true, name: true, createdAt: true, updatedAt: true },
                orderBy: { createdAt: 'desc' }
            })
        };
        return output;
    }
    //CATEGORY
    async getCategory(accountId: number) {
        const output = await this._category.getInstance().findMany({
            where: { accountId, deleteAt: null },
            select: { id: true, code: true, name: true, createdAt: true, updatedAt: true },
            orderBy: { createdAt: 'desc' }
        });
        return output;
    }

    async createCategory(params: RequestParamDto) {
        const { userId, body } = params;
        try {
            const createOperator = this._category.getInstance().create({
                data: { ...body, accountId: userId },
                select: { id: true, name: true, code: true, accountId: true }
            });
            const [output] = await this._category.transaction([createOperator]);
            return output;
        } catch {
            return new AppError('ERR', 'Error create category!');
        }
    }

    async updateCategory(params: RequestParamDto, id?: number) {
        const { userId, body } = params;
        try {
            const record = await this._category.getInstance().findUnique({ where: { id: id } });
            if (record.accountId == userId && record.deleteAt == null) {
                const updateOperator = this._category.getInstance().update({
                    data: { ...body },
                    where: { id: id }
                });
                const [output] = await this._category.transaction([updateOperator]);
                return output;
            } else return new AppError('ERR', 'Can not update category!');
        } catch {
            return new AppError('ERR', 'Error update category!');
        }
    }

    async deleteCategory(params: RequestParamDto, id?: number) {
        const { userId } = params;
        try {
            const record = await this._category.getInstance().findUnique({
                where: { id: id }
            });
            if (record.accountId == userId && record.deleteAt == null) {
                await this._category.getInstance().update({
                    where: { id: id },
                    data: {
                        deleteAt: new Date()
                    }
                });
                return 'Deleted';
            } else return new AppError('ERR', 'Can not delete category');
        } catch {
            return new AppError('ERR', 'Error delete category!');
        }
    }

    // BILL
    async getBill(accountId: number) {
        const output = await this._bill.getInstance().findMany({
            where: { accountId, deleteAt: null },
            select: { id: true, code: true, name: true, createdAt: true, updatedAt: true },
            orderBy: { createdAt: 'desc' }
        });

        return output;
    }

    // async createPost(params: RequestParamDto) {
    //     const { userId, body } = params;
    //     try {
    //         const createOperator = this._post.getInstance().create({
    //             data: { ...(body as any), accountId: userId },
    //             select: { id: true, name: true, code: true, accountId: true, categoryId: true }
    //         });
    //         const [output] = await this._post.transaction([createOperator]);
    //         return output;
    //     } catch {
    //         return new AppError('ERR', 'Error create post!');
    //     }
    // }

    // async updatePost(params: RequestParamDto, id?: number) {
    //     const { userId, body } = params;
    //     try {
    //         const record = await this._post.getInstance().findUnique({ where: { id: id } });
    //         if (record.accountId != userId && record.deleteAt != null) return new AppError('ERR', 'Can not update post!');
    //         else {
    //             const updateOperator = this._post.getInstance().update({
    //                 data: { ...body },
    //                 where: { id: id }
    //             });
    //             const [output] = await this._post.transaction([updateOperator]);
    //             return output;
    //         }
    //     } catch {
    //         return new AppError('ERR', 'Error update post!');
    //     }
    // }

    // async deletePost(params: RequestParamDto, id?: number) {
    //     const { userId } = params;
    //     try {
    //         const record = await this._post.getInstance().findUnique({
    //             where: { id: id }
    //         });
    //         if (record.accountId == userId && record.deleteAt == null) {
    //             await this._post.getInstance().update({
    //                 where: { id: id },
    //                 data: {
    //                     deleteAt: new Date()
    //                 }
    //             });
    //             return 'Deleted';
    //         } else return new AppError('ERR', 'Can not delete post');
    //     } catch {
    //         return new AppError('ERR', 'Error delete post!');
    //     }
    // }

    // async deleteAllPost(params: RequestParamDto) {
    //     try {
    //         await this._post.getInstance().deleteMany({
    //             where: { accountId: params.userId }
    //         });
    //         return 'Deleted!';
    //     } catch {
    //         return new AppError('ERR', 'Error delete');
    //     }
    // }

    // //NOTE
    // async getNote(accountId: number) {
    //     const output = await this._note.getInstance().findMany({
    //         where: { accountId, deleteAt: null },
    //         select: { id: true, code: true, name: true, createdAt: true, updatedAt: true },
    //         orderBy: { createdAt: 'desc' }
    //     });
    //     return output;
    // }

    // async createNote(params: RequestParamDto) {
    //     const { userId, body } = params;
    //     try {
    //         const createOperator = this._note.getInstance().create({
    //             data: { ...(body as any), accountId: userId },
    //             select: { id: true, name: true, code: true, accountId: true, categoryId: true }
    //         });
    //         const [output] = await this._note.transaction([createOperator]);
    //         return output;
    //     } catch {
    //         return new AppError('ERR', 'Error create note!');
    //     }
    // }

    // async updateNote(params: RequestParamDto, id?: number) {
    //     const { userId, body } = params;
    //     try {
    //         const record = await this._note.getInstance().findUnique({ where: { id: id } });
    //         if (record.accountId != userId && record.deleteAt != null) return new AppError('ERR', 'Can not update note!');
    //         else {
    //             const updateOperator = this._note.getInstance().update({
    //                 data: { ...body },
    //                 where: { id: id }
    //             });
    //             const [output] = await this._note.transaction([updateOperator]);
    //             return output;
    //         }
    //     } catch {
    //         return new AppError('ERR', 'Error update note!');
    //     }
    // }

    // async deleteNote(params: RequestParamDto, id?: number) {
    //     const { userId } = params;
    //     try {
    //         const record = await this._note.getInstance().findUnique({
    //             where: { id: id }
    //         });
    //         if (record.accountId == userId && record.deleteAt == null) {
    //             await this._note.getInstance().update({
    //                 where: { id: id },
    //                 data: {
    //                     deleteAt: new Date()
    //                 }
    //             });
    //             return 'Deleted';
    //         } else return new AppError('ERR', 'Can not delete note');
    //     } catch {
    //         return new AppError('ERR', 'Error delete note!');
    //     }
    // }

    // async deleteAllNote(params: RequestParamDto) {
    //     try {
    //         await this._note.getInstance().deleteMany({
    //             where: { accountId: params.userId }
    //         });
    //         return 'Deleted!';
    //     } catch {
    //         return new AppError('ERR', 'Error delete');
    //     }
    // }

    // // WALLET
    // async getWallet(accountId: number) {
    //     const output = await this._wallet.getInstance().findMany({
    //         where: { accountId, deleteAt: null },
    //         select: { id: true, code: true, name: true, createdAt: true, updatedAt: true },
    //         orderBy: { createdAt: 'desc' }
    //     });
    //     return output;
    // }

    // async createWallet(params: RequestParamDto) {
    //     const { userId, body } = params;
    //     try {
    //         const createOperator = this._wallet.getInstance().create({
    //             data: { ...(body as any), accountId: userId },
    //             select: { id: true, name: true, code: true, accountId: true }
    //         });
    //         const [output] = await this._wallet.transaction([createOperator]);
    //         return output;
    //     } catch {
    //         return new AppError('ERR', 'Error create wallet!');
    //     }
    // }

    // async updateWallet(params: RequestParamDto, id?: number) {
    //     const { userId, body } = params;
    //     try {
    //         const record = await this._wallet.getInstance().findUnique({ where: { id: id } });
    //         if (record.accountId != userId && record.deleteAt != null) return new AppError('ERR', 'Can not update wallet!');
    //         else {
    //             const updateOperator = this._wallet.getInstance().update({
    //                 data: { ...body },
    //                 where: { id: id }
    //             });
    //             const [output] = await this._wallet.transaction([updateOperator]);
    //             return output;
    //         }
    //     } catch {
    //         return new AppError('ERR', 'Error update wallet!');
    //     }
    // }

    // async deleteWallet(params: RequestParamDto, id?: number) {
    //     const { userId } = params;
    //     try {
    //         const record = await this._wallet.getInstance().findUnique({
    //             where: { id: id }
    //         });
    //         if (record.accountId == userId && record.deleteAt == null) {
    //             await this._wallet.getInstance().update({
    //                 where: { id: id },
    //                 data: {
    //                     deleteAt: new Date()
    //                 }
    //             });
    //             return 'Deleted';
    //         } else return new AppError('ERR', 'Can not delete wallet');
    //     } catch {
    //         return new AppError('ERR', 'Error delete wallet!');
    //     }
    // }

    // async deleteAllWallet(params: RequestParamDto) {
    //     try {
    //         await this._wallet.getInstance().deleteMany({
    //             where: { accountId: params.userId }
    //         });
    //         return 'Deleted!';
    //     } catch {
    //         return new AppError('ERR', 'Error delete');
    //     }
    // }
}
