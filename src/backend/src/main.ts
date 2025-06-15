import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {LoggerService} from './modules/logger/logger.service';
import helmet from 'helmet';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {RequestMethod} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {bufferLogs: true});
    app.use(helmet());
    app.enableCors();
    app.useLogger(app.get(LoggerService));
    app.setGlobalPrefix('api/v1', {
        exclude: [{path: 'docs/v1', method: RequestMethod.GET}],
    });
    const config = new DocumentBuilder()
        .setTitle('URL Shortener API')
        .setDescription('API для сервиса сокращения ссылок')
        .setVersion('1.0')
        .addBearerAuth() // JWT авторизация
        .build();

    const document = SwaggerModule.createDocument(app, config);
    if (process.env.NODE_ENV !== 'production') {
        SwaggerModule.setup('docs/v1', app, document);
    }

    await app.listen(process.env.PORT || 3000);
}

void bootstrap();