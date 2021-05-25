import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const CheckOperation: OperationObject = {
    tags: ['auth'],
    summary: 'Check phone that used or not.',
    operationId: 'check',
    parameters: [
        {
            name: 'phone',
            in: 'path',
            schema: { type: 'string' },
            required: true
        }
    ],
    responses: {
        '200': {
            description: 'Return basic user info. If not found user, return empty body',
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
