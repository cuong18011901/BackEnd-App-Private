import { ConfigService } from '@app/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { AuthenticatorModule } from './authenticator.module';

const logger = new Logger('App-Authenticator');
const config = new ConfigService();

const opts: TcpOptions = {
    transport: Transport.TCP,
    options: { host: config.get('AUTHENTICATOR_HOST'), port: config.getNumber('AUTHENTICATOR_PORT') }
};
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AuthenticatorModule, opts);
    app.listen(() => logger.log('App-Authenticator is running ....'));
}
bootstrap();
