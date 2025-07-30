/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as timeOut from 'connect-timeout';

import AppModule from './app.module';
import ValidationExceptionFilter from './Exceptions/error.exception';
import LoggerMiddleware from './logger/logger.middleware';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const isProd = configService.get<string>('PROD') === '1';
  const port = configService.get<number>('PORT');
  const host = configService.get<string>('DB_HOST');
  const dbPort = configService.get<string>('DB_PORT');
  const username = configService.get<string>('DB_USERNAME');
  const password = configService.get<string>('DB_PASSWORD');
  const dbName = configService.get<string>('DB_NAME');

  const dbUri = `postgres://${username}:${password}@${host}:${dbPort}/${dbName}`;

  app.setGlobalPrefix('api');
  app.use(timeOut('30s'));
  app.use(bodyParser.json({ limit: '20mb' }));
  app.enableCors({ origin: '*', credentials: true });

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true, whitelist: true, forbidNonWhitelisted: true, transform: true, }),);
  app.useGlobalFilters(new ValidationExceptionFilter());

  if (isProd) app.use(new LoggerMiddleware().use);

  const server = await app.listen(port);
  const address = server.address();

  Logger.log(`Application is running on: http://localhost:${address.port}/api`, 'Bootstrap',);
  Logger.log(`Connected to the database: ${dbUri}`, 'Bootstrap');

};

bootstrap();