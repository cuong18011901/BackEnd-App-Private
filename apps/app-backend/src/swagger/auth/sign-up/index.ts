import { OperationObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const SignupRequest: SchemaObject = {
    type: 'object',
    properties: {
        phone: {
            type: 'string',
            example: '0901234567'
        },
        passcode: {
            type: 'string',
            example: '000000'
        },
        fullName: {
            type: 'string',
            example: 'Nguyen Van A'
        },
        token: {
            type: 'string',
            example: 'xxxxxxxx',
            description: 'Token receive after verified OTP.'
        }
    },
    required: ['phone', 'passcode', 'token']
};

export const SignupResponse: SchemaObject = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            example: 0
        },
        phone: {
            type: 'string',
            example: '+84 90 123 45 67'
        },
        fullName: {
            type: 'string',
            example: 'Nguyen Van A'
        }
    }
};

export const SignupOperation: OperationObject = {
    tags: ['auth'],
    summary: 'Sign up account',
    operationId: 'sign-up',
    parameters: [],
    requestBody: {
        required: true,
        description: 'Account information',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/SignupRequest'
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'Successfully Registered',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/SignupResponse'
                    }
                }
            }
        }
    }
};
