import { PathsObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { GetUserOperation } from './get';

export const UserPaths: PathsObject = {
    '/api/user': { get: GetUserOperation }
};
