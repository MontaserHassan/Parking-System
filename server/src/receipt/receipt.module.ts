/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import CarsModule from 'src/cars/cars.module';
import ParkingPlaceModule from 'src/parking-place/parking-place.module';
import { Receipt, ReceiptSchema } from './entities/receipt.entity';
import ReceiptController from './receipt.controller';
import ReceiptService from './receipt.service';
import Util from 'src/Utils/util.util';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Receipt.name, schema: ReceiptSchema },]),
    ParkingPlaceModule,
    CarsModule,
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService, Util],
  exports: [ReceiptService,]
})
export default class ReceiptModule { };