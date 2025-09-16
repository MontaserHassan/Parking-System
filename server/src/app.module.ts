/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from "mongoose";

import AppController from './app.controller';
import AppService from './app.service';
import UtilModule from './modules/Utils/util.module';
import CarsModule from './modules/cars/cars.module';
import ContactUsModule from './modules/contact-us/contact-us.module';
import DiscountModule from './modules/discount/discount.module';
import FeesModule from './modules/fees/fees.module';
import OpenaiModule from './modules/openai/openai.module';
import NewsModule from './modules/news/news.module';
import ParkingPlaceModule from './modules/parking-place/parking-place.module';
import ProductModule from './modules/product/product.module';
import ReceiptModule from './modules/receipt/receipt.module';
import TaxModule from './modules/tax/tax.module';
// import RabbitMqmoduleModule from './modules/rabbit-mqmodule/rabbit-mqmodule.module';
import logger from './config/logger.config';



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
        ProductModule,
        OpenaiModule,
        // RabbitMqmoduleModule,
    ],
    controllers: [AppController,],
    providers: [AppService,],
})
export default class AppModule {

    constructor() {
        mongoose.set('debug', (collectionName: string, method: string, query: any, doc: any) => {
            logger.logInfo('Database Query Executed', { collectionName, method, query, doc, });
        });
    };

};