/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import UtilModule from './modules/Utils/util.module';
import NewsModule from './modules/news/news.module';
import ContactUsModule from './modules/contact-us/contact-us.module';
import AppController from './app.controller';
import AppService from './app.service';
import CarsModule from './modules/cars/cars.module';
import ParkingPlaceModule from './modules/parking-place/parking-place.module';
import FeesModule from './modules/fees/fees.module';
import ReceiptModule from './modules/receipt/receipt.module';
import DiscountModule from './modules/discount/discount.module';
import TaxModule from './modules/tax/tax.module';
import RabbitMqmoduleModule from './modules/rabbit-mqmodule/rabbit-mqmodule.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forRoot(process.env.DB_URI),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    UtilModule,
    NewsModule,
    ContactUsModule,
    CarsModule,
    ParkingPlaceModule,
    FeesModule,
    ReceiptModule,
    DiscountModule,
    TaxModule,
    RabbitMqmoduleModule,

  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export default class AppModule { };