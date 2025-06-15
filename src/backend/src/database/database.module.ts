import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService, ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.getOrThrow<string>('DB_HOST'),
                port: config.getOrThrow<number>('DB_PORT'),
                username: config.getOrThrow<string>('DB_USER'),
                password: config.getOrThrow<string>('DB_PASSWORD'),
                database: config.getOrThrow<string>('DB_NAME'),
                autoLoadEntities: true,
                synchronize: true,
                migrationsRun: false,
                logging: true,
                ssl: config.getOrThrow<string>('NODE_ENV') === 'production' ? {rejectUnauthorized: false} : undefined,
                migrations: ['src/database/migrations/*.ts'],
                migrationsTableName: 'migrations',
            }),
        }),
    ],
})
export class DatabaseModule {
}