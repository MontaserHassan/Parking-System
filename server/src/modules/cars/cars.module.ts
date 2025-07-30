/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ParkingPlaceModule from 'src/modules/parking-place/parking-place.module';
import ReceiptModule from 'src/modules/receipt/receipt.module';
import DiscountModule from 'src/modules/discount/discount.module';
import FeesModule from 'src/modules/fees/fees.module';
import CarsController from './cars.controller';
import CarsService from './cars.service';
import Util from 'src/modules/Utils/util.util';
import PaymentUtil from 'src/modules/Utils/payment.util';
import { Car, CarSchema } from './database/car.database';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema },]),
    ParkingPlaceModule,
    ReceiptModule,
    DiscountModule,
    FeesModule,
    PaymentUtil,
  ],
  controllers: [CarsController],
  providers: [CarsService, Util,],
  exports: [CarsService,]
})
export default class CarsModule { };