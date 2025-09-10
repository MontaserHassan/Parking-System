/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as timeOut from 'connect-timeout';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import AppModule from './app.module';
import ValidationExceptionFilter from 'src/core/Exceptions/error.exception';
import LoggerMiddleware from 'src/core/logger/logger.middleware';
import { rabbitMQQueues } from './modules/rabbit-mqmodule/queue.rabbit-mqmodule';



async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const isProd = configService.get<string>('PROD') === '1';
    const port = configService.get<number>('PORT');
    const dbUri = configService.get<string>('DB_URI');
    const rabbitMqUri = configService.get<string>('RABBITMQ_URI');
    const redisHost = configService.get<string>('REDIS_HOST');
    const redisPort = configService.get<number>('REDIS_PORT');
    const elasticsearchNode = configService.get<string>('ELASTICSEARCH_NODE');

    app.setGlobalPrefix('api');
    app.use(timeOut('30s'));
    app.use(bodyParser.json({ limit: '20mb' }));
    app.enableCors({ origin: '*', credentials: true });

    app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true, whitelist: true, forbidNonWhitelisted: true, transform: true, }),);
    app.useGlobalFilters(new ValidationExceptionFilter());

    if (isProd) app.use(new LoggerMiddleware().use);

    for (const queue of rabbitMQQueues) {
        // app.connectMicroservice<MicroserviceOptions>({
        //   transport: Transport.RMQ,
        //   options: {
        //     urls: [rabbitMqUri],
        //     queue: queue.name,
        //     queueOptions: queue.options,
        //   },
        // });
    };
    await app.startAllMicroservices();

    const server = await app.listen(port);
    const address = server.address();

    Logger.log(`Application is running on: http://localhost:${address.port}/api`, 'Bootstrap',);
    Logger.log(`Connected to the database: ${dbUri}`, 'Bootstrap');
    Logger.log(`connected to rabbitmq server: ${rabbitMqUri}`, 'Bootstrap');
    Logger.log(`connected to redis server: ${redisHost}:${redisPort}`, 'Bootstrap');
    Logger.log(`connected to elasticsearch server: ${elasticsearchNode}`, 'Bootstrap');

};

bootstrap();