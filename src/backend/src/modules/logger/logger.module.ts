import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                node: configService.getOrThrow('ELASTICSEARCH_NODE'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {}