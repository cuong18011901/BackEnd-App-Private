import { OperationObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const VerifyOTPRequest: SchemaObject = {
    type: 'object',
    properties: {
        phone: {
            type: 'string',
            example: '+84 90 123 45 67'
        },
        email: {
            type: 'string',
            example: 'email@domain.com'
        },
        otp: {
            type: 'string',
            example: '123456'
        },
        type: {
            type: 'string',
            example: '1',
            description: '1: Sign up | 2: User | 3: Payment | 4: Reset password'
        }
    },
    required: ['otp', 'type']
};

export const VerifyOTPOperation: OperationObject = {
    tags: ['auth'],
    summary: 'Verify OTP to move next process.',
    operationId: 'verify-otp',
    requestBody: {
        required: true,
        description: '',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/VerifyOTPRequest'
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'Return token that will be used in next process.',
            content: {
                'application/json': {
                    example: 'XXXXXX'
                }
            }
        }
    }
};
