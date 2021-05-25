import { OperationObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const SigninRequest: SchemaObject = {
    type: 'object',
    properties: {
        phone: {
            type: 'string',
            example: '0901234567'
        },
        passcode: {
            type: 'string',
            example: '000000'
        }
    },
    required: ['phone', 'passcode']
};

export const SigninResponse: SchemaObject = {
    type: 'object',
    properties: {
        expiresIn: {
            type: 'number',
            example: 0
        },
        accessToken: {
            type: 'string',
            example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIxNTk0MDM4LCJleHAiOjE2MjE1OTc2Mzh9.GXBCcTjKGNXwDMrdIo0LCg2b3_Clk9OO8WqoBSwuXl8'
        }
    }
};

export const SigninOperation: OperationObject = {
    tags: ['auth'],
    summary: 'Sign in to the system',
    operationId: 'sign-in',
    parameters: [],
    requestBody: {
        required: true,
        description: 'Account information',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/SigninRequest'
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'Sign in successful',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/SigninResponse'
                    }
                }
            }
        }
    }
};
