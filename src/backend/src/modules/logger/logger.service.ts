import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class LoggerService implements NestLoggerService {
    constructor(private readonly es: ElasticsearchService) {}

    log(message: string, ...meta: any[]) {
        this.es.index({
            index: 'app-logs',
            body: { level: 'log', message, meta, timestamp: new Date() },
        });
        console.log(message, ...meta);
    }
    error(message: any, trace?: string, ...meta: any[]) {
        this.es.index({
            index: 'app-errors',
            body: { level: 'error', message, trace, meta, timestamp: new Date() },
        });
        console.error(message, trace, ...meta);
    }
    warn(message: any, ...meta: any[]) {
        this.es.index({
            index: 'app-warns',
            body: { level: 'warn', message, meta, timestamp: new Date() },
        });
        console.warn(message, ...meta);
    }
    // debug, verbose - по аналогии
}