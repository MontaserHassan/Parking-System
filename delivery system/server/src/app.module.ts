/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import UtilModule from './Utils/util.module';
import ShipmentModule from './shipment/shipment.module';
import AppController from './app.controller';
import AppService from './app.service';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    UtilModule,
    ShipmentModule,
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export default class AppModule { };