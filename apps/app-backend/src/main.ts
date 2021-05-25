import { ConfigService } from '@app/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
// import compression from 'compression';
// import RateLimit from 'express-rate-limit';
// import helmet from 'helmet';
// import morgan from 'morgan';
import { AppModule } from './app.module';

const logger = new Logger('App-Main');

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // app.use(helmet);
    // app.use(
    //     RateLimit({
    //         windowMs: 15 * 60 * 1000, // 15 minutes
    //         max: 100, // limit each IP to 100 requests per windowMs
    //     }),
    // );
    // app.use(compression());
    // app.use(morgan('combined'));
    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         whitelist: true,
    //         errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    //         transform: true,
    //         dismissDefaultMessages: true,
    //         exceptionFactory: errors => new UnprocessableEntityException(errors),
    //     }),
    // );

    if (['development', 'staging'].includes(ConfigService.getInstance().nodeEnv)) {
        const { setupSwagger } = await import('./swagger');
        setupSwagger(app);
    }

    const port = 3000;
    await app.listen(port, () => logger.log(`App-Main is running at http://localhost:${port}`));
}

bootstrap();
