import { OperationObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const OTPRequest: SchemaObject = {
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
        type: {
            type: 'string',
            example: '1',
            description: '1: Sign up | 2: User | 3: Payment | 4: Reset password'
        }
    },
    required: ['type']
};

export const RequestOTPOperation: OperationObject = {
    tags: ['auth'],
    summary: 'Request OTP to verify process.',
    operationId: 'request-otp',
    requestBody: {
        required: true,
        description: '',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/OTPRequest'
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'OTP will be send via SMS or email shortly.'
        }
    }
};
