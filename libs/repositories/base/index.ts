import { ConfigService } from '@app/config';
import { PrismaClient, PrismaPromise } from '@prisma/client';

export class BaseClient {
    protected readonly _client: PrismaClient;
    constructor() {
        this._client = new PrismaClient({
            log: ['query', 'info', `warn`, `error`]
        });
        this.executeMigration();
    }

    public transaction<P extends PrismaPromise<any>>(arg: P[]) {
        return this._client.$transaction(arg);
    }

    private async executeMigration() {
        const config = new ConfigService();
        if (config.nodeEnv !== 'development')
            new Promise(async (resolve, reject) => {
                const { exec } = await import('child_process');
                const migrate = exec('yarn prisma migrate deploy', { env: process.env }, err =>
                    err ? reject(err) : resolve(true)
                );
                // Forward stdout+stderr to this process
                migrate.stdout.pipe(process.stdout);
                migrate.stderr.pipe(process.stderr);
            });
    }
}
