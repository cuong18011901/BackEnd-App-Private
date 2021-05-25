import { CachingModule } from '@app/caching';
import { ConfigService } from '@app/config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtRolesAuthGuard } from './jwt/jwt-roles.guard';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ProxyController } from './proxy.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: ConfigService.getInstance().get('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: ConfigService.getInstance().getNumber('JWT_EXPIRATION_TIME') }
                };
            }
        }),
        CachingModule
    ],
    controllers: [AuthController, ProxyController],
    providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtRolesAuthGuard }],
    exports: []
})
export class AppModule {}
