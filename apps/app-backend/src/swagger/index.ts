export const setupSwagger = async (app: any) => {
    const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
    const { version } = await import('../../../../package.json');
    const { AuthPaths, AuthSchema } = await import('./auth');
    const { UserPaths, UserSchema } = await import('./user');
    const options = new DocumentBuilder()
        .setTitle('App API')
        .setDescription('CAUTION: This document is for internal use only')
        .setVersion(version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    document.paths = {
        ...AuthPaths,
        ...UserPaths
    };
    document.components = {
        securitySchemes: {
            bearer: {
                scheme: 'bearer',
                bearerFormat: 'JWT',
                type: 'http'
            }
        },
        schemas: {
            ...AuthSchema,
            ...UserSchema
        }
    };
    SwaggerModule.setup('documentation', app, document);
};
