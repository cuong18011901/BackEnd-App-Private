import { AppError, MESSAGE_PATTERN, OTP_TYPE } from '@app/common';
import { ConfigService } from '@app/config';
import { Body, Controller, Get, HttpCode, Param, Patch, Post, Res, UsePipes } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Logger } from '@nestjs/common/services';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Response } from 'express';
import { Public } from './decorator';
import {
    AccountDto,
    OTPRequestDto,
    OTPTypeRequestDto,
    PhoneRequestDto,
    SigninRequestDto,
    SignupRequestDto,
    TokenPayloadDto,
    VerifyOTPRequestDto
} from './dto';
import { MainValidationPipe } from './pipes/validation.pipe';

@Controller('auth')
export class AuthController {
    private readonly _logger = new Logger('AuthController');

    private readonly _client: ClientProxy;
    constructor(private readonly _jwtService: JwtService) {
        this._client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: ConfigService.getInstance().get('AUTHENTICATOR_HOST'),
                port: ConfigService.getInstance().getNumber('AUTHENTICATOR_PORT')
            }
        });
    }

    @Public()
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    @Get('check/:phone')
    async checkPhone(@Param() { phone }: PhoneRequestDto) {
        this._logger.log('checkPhone - send');
        console.log(`phone`, phone);
        const account = await this._client.send<AccountDto, string>(MESSAGE_PATTERN.AUTH.FIND_ACCOUNT, phone).toPromise();
        if (account) {
            delete account.passcode;
        }
        return account;
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    @Post('request-otp')
    async requestOTP(@Body() requestDto: OTPRequestDto) {
        this._logger.log(`request-otp - send`);
        if (Object.values(OTP_TYPE).findIndex(t => t.toString() === requestDto.type) != -1)
            return this._client.send<boolean, OTPRequestDto & OTPTypeRequestDto>(MESSAGE_PATTERN.AUTH.REQUEST_OTP, requestDto);
        else {
            return false;
        }
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @UsePipes(new MainValidationPipe())
    @Post('verify-otp')
    async verifyOTP(@Body() requestDto: VerifyOTPRequestDto) {
        this._logger.log('verify-otp - send');
        return this._client.send<boolean, VerifyOTPRequestDto>(MESSAGE_PATTERN.AUTH.VERIFY_OTP, requestDto);
    }

    @Public()
    @UsePipes(new MainValidationPipe())
    @Post('sign-up')
    async signUp(@Body() requestDto: SignupRequestDto, @Res() res: Response) {
        this._logger.log('signUp - send');
        const output = await this._client.send<AccountDto & AppError, SignupRequestDto>('sign-up', requestDto).toPromise();
        if (output.errCode) {
            res.status(HttpStatus.BAD_REQUEST).json(output);
        } else {
            res.status(HttpStatus.OK).json(output);
        }
    }

    @Public()
    @UsePipes(new MainValidationPipe())
    @Post('sign-in')
    async signIn(@Body() requestDto: SigninRequestDto, @Res() res: Response) {
        this._logger.log('signIn - send');
        const account = await this._client
            .send<AccountDto, SigninRequestDto>(MESSAGE_PATTERN.AUTH.SIGN_IN, requestDto)
            .toPromise();
        if (account && account.id) {
            res.status(HttpStatus.OK).json(
                new TokenPayloadDto(
                    this._jwtService.sign({ id: account.id }),
                    ConfigService.getInstance().getNumber('JWT_EXPIRATION_TIME')
                )
            );
        } else {
            throw new UnauthorizedException('INVALID_CREDENTIALS');
        }
    }

    @Public()
    @UsePipes(new MainValidationPipe())
    @Patch('reset-passcode')
    async resetPasscode(@Body() requestDto: SigninRequestDto, @Res() res: Response) {
        this._logger.log('reset-passcode - send');
        try {
            const output = await this._client
                .send<SigninRequestDto, SigninRequestDto>(MESSAGE_PATTERN.AUTH.RESET_PASSCODE, requestDto)
                .toPromise();
            res.status(HttpStatus.OK).json(output);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ ...error, message: 'Phone not exist.' });
        }
    }
}
