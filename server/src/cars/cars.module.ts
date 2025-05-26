/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ParkingPlaceModule from 'src/parking-place/parking-place.module';
import ReceiptModule from 'src/receipt/receipt.module';
import DiscountModule from 'src/discount/discount.module';
import FeesModule from 'src/fees/fees.module';
import CarsController from './cars.controller';
import CarsService from './cars.service';
import Util from 'src/Utils/util.util';
import PaymentUtil from 'src/Utils/payment.util';
import { Car, CarSchema } from './entities/car.entity';



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