import { MESSAGE_PATTERN, ROUTING } from '@app/common';
import { ConfigService } from '@app/config';
import { Controller, Logger, NotFoundException, Req, RequestMapping, RequestMethod } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Request } from 'express';

@Controller('/api')
export class ProxyController {
    private readonly _logger = new Logger('ProxyController');

    private readonly _clientMap: Map<string, ClientProxy>;
    constructor() {
        this._clientMap = new Map();
        this._clientMap.set(
            ROUTING.USER,
            ClientProxyFactory.create({
                transport: Transport.TCP,
                options: {
                    host: ConfigService.getInstance().get('USER_HOST'),
                    port: ConfigService.getInstance().getNumber('USER_PORT')
                }
            })
        );
    }

    @RequestMapping({ path: '*', method: RequestMethod.GET })
    async get(@Req() req: Request) {
        const { params, user, query } = req;
        const path = params[0].split('/')[0];
        const client = this._clientMap.get(path);

        if (client) {
            this._logger.log(`get ${path} - send`);
            return client.send<string, unknown>(MESSAGE_PATTERN.PROXY.GET, { params, query, ...user });
        } else throw new NotFoundException();
    }

    @RequestMapping({ path: '*', method: RequestMethod.POST })
    async post(@Req() req: Request) {
        const { method, url, body, params, user, query } = req;
        const path = params[0].split('/')[0];
        console.log(`post`, method, url, path);
        // TODO check destination server to dispatch
        const client = this._clientMap.get(path);
        if (client) return client.send<string, unknown>(MESSAGE_PATTERN.PROXY.POST, { params, query, body, ...user });
        else throw new NotFoundException();
    }

    @RequestMapping({ path: '*', method: RequestMethod.PATCH })
    async patch(@Req() req: Request) {
        const { method, url, body, params, user, query } = req;
        const path = params[0].split('/')[0];
        console.log(`patch`, method, url, path);
        // TODO check destination server to dispatch
        const client = this._clientMap.get(path);
        if (client) return client.send<string, unknown>(MESSAGE_PATTERN.PROXY.PATCH, { params, query, body, ...user });
        else throw new NotFoundException();
    }

    @RequestMapping({ path: '*', method: RequestMethod.DELETE })
    async delete(@Req() req: Request) {
        const { method, url, params, user, query } = req;
        const path = params[0].split('/')[0];
        console.log(`delete`, method, url, path);
        // TODO check destination server to dispatch
        const client = this._clientMap.get(path);
        if (client) return client.send<string, unknown>(MESSAGE_PATTERN.PROXY.DELETE, { params, query, ...user });
        else throw new NotFoundException();
    }

    @RequestMapping({ path: '*', method: RequestMethod.DELETE })
    async deleteAll(@Req() req: Request) {
        const { method, url, params, user, query } = req;
        const path = params[0].split('/')[0];
        console.log(`delete`, method, url, path);
        // TODO check destination server to dispatch
        const client = this._clientMap.get(path);
        if (client) return client.send<string, unknown>(MESSAGE_PATTERN.PROXY.DELETE, { params, query, ...user });
        else throw new NotFoundException();
    }
}
