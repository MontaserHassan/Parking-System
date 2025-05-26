/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import UtilModule from './Utils/util.module';
import NewsModule from './news/news.module';
import ContactUsModule from './contact-us/contact-us.module';
import AppController from './app.controller';
import AppService from './app.service';
import CarsModule from './cars/cars.module';
import ParkingPlaceModule from './parking-place/parking-place.module';
import FeesModule from './fees/fees.module';
import ReceiptModule from './receipt/receipt.module';
import DiscountModule from './discount/discount.module';
import TaxModule from './tax/tax.module';



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
  ],
  controllers: [AppController,],
  providers: [AppService,],
})
export default class AppModule { };