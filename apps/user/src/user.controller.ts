import { MESSAGE_PATTERN } from '@app/common';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RequestParamDto } from '../dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    private readonly _logger: Logger = new Logger('UserController');

    constructor(private readonly _service: UserService) {}

    @MessagePattern(MESSAGE_PATTERN.PROXY.GET)
    get(params: RequestParamDto) {
        this._logger.log(`get - invoked - params: ${JSON.stringify(params)}`);
        const path = params.params[0].split('/');
        switch (path[1]) {
            case 'profile':
                return this._service.getUser(params.userId);
            case 'category':
                return this._service.getCategory(params.userId);
            case 'post':
                return this._service.getPost(params.userId);
            case 'note':
                return this._service.getNote(params.userId);
            default:
                break;
        }
    }

    @MessagePattern(MESSAGE_PATTERN.PROXY.POST)
    create(params: RequestParamDto) {
        this._logger.log(`get - invoked - params: ${JSON.stringify(params)}`);
        const path = params.params[0].split('/');
        switch (path[1]) {
            case 'category':
                return this._service.createCategory(params);
            case 'post':
                return this._service.createPost(params);
            case 'note':
                return this._service.createNote(params);
            default:
                break;
        }
    }

    @MessagePattern(MESSAGE_PATTERN.PROXY.PATCH)
    update(params: RequestParamDto) {
        this._logger.log(`get - invoked - params: ${JSON.stringify(params.params)}`);
        const path = params.params[0].split('/');
        switch (path[1]) {
            case 'category':
                return this._service.updateCategory(params, +path[2]);
            case 'post':
                return this._service.updatePost(params, +path[2]);
            case 'note':
                return this._service.updateNote(params, +path[2]);
            default:
                break;
        }
    }

    @MessagePattern(MESSAGE_PATTERN.PROXY.DELETE)
    delete(params: RequestParamDto) {
        this._logger.log(`get - invoked - params: ${JSON.stringify(params.params)}`);
        const path = params.params[0].split('/');
        switch (path[1]) {
            case 'category':
                return this._service.deleteCategory(params, +path[2]);
            case 'post':
                return this._service.deletePost(params, +path[2]);
            case 'note':
                return this._service.deleteNote(params, +path[2]);
            default:
                break;
        }
    }

    @MessagePattern(MESSAGE_PATTERN.PROXY.DELETE)
    deleteAll(params: RequestParamDto) {
        this._logger.log(`get - invoked - params: ${JSON.stringify(params.params)}`);
        const path = params.params[0].split('/');
        switch (path[1]) {
            case 'category':
                return this._service.deleteAllCategory(params);
            case 'post':
                return this._service.deleteAllPost(params);
            case 'note':
                return this._service.deleteAllNote(params);
            default:
                break;
        }
    }
}
