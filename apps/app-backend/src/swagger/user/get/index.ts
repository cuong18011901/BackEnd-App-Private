import { OperationObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const UserResponse: SchemaObject = {
    type: 'object',
    properties: {
        accountId: {
            type: 'number',
            example: 0
        },
        category: {
            type: 'array',
            example: [
                {
                    code: 'BTC',
                    name: 'Bitcoin'
                }
            ]
        }
    }
};

export const GetUserOperation: OperationObject = {
    tags: ['user'],
    security: [
        {
            bearer: []
        }
    ],
    summary: 'Get User from current account.',
    operationId: 'api/user',
    responses: {
        '200': {
            description: 'Return user information.',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/UserResponse'
                    }
                }
            }
        }
    }
};
