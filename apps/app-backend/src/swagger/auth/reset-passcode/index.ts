import { OperationObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ResetPasscodeRequest: SchemaObject = {
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
        token: {
            type: 'string',
            example: 'xxxxxxxx',
            description: 'Token receive after verified OTP.'
        }
    },
    required: ['phone', 'passcode', 'token']
};

export const ResetPasscodeOperation: OperationObject = {
    tags: ['auth'],
    summary: 'Reset passcode',
    operationId: 'reset-passcode',
    parameters: [],
    requestBody: {
        required: true,
        description: 'Account information',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/ResetPasscodeRequest'
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'Reset passcode successfully'
        }
    }
};
