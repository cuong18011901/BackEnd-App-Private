import { ConfigService } from '@app/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

const logger = new Logger('App-Cashback');
const config = new ConfigService();

const opts: TcpOptions = {
    transport: Transport.TCP,
    options: { host: config.get('USER_HOST'), port: config.getNumber('USER_PORT') }
};
async function bootstrap() {
    const app = await NestFactory.createMicroservice(UserModule, opts);
    app.listen(() => logger.log('App-Cashback is running ....'));
}
bootstrap();
