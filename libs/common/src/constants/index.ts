export enum OTP_TYPE {
    SIGN_UP = '1',
    USER = '2',
    PAYMENT = '3',
    RESET_PASSCODE = '4'
}

export enum Order {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum RoleType {
    MANAGER = 'ROLE_MANAGER',
    ADMIN = 'ROLE_ADMIN',
    EDITOR = 'ROLE_EDITOR',
    USER = 'ROLE_USER'
}

export class CommonConstants {
    static readonly ORDER = Order;
    static readonly ROLE_TYPE = RoleType;
}

export enum ROUTING {
    USER = 'user'
}

export enum STATUS {
    INACTIVE = 0,
    ACTIVE = 1
}

export const MESSAGE_PATTERN = {
    AUTH: {
        FIND_ACCOUNT: 'find-account',
        SIGN_IN: 'sign-in',
        SIGN_UP: 'sign-up',
        REQUEST_OTP: 'request-otp',
        VERIFY_OTP: 'verify-otp',
        RESET_PASSCODE: 'reset-passcode'
    },
    PROXY: {
        GET: 'get',
        POST: 'post',
        PATCH: 'patch',
        DELETE: 'delete'
    }
};
