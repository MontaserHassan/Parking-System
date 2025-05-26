/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ParkingPlaceModule from 'src/parking-place/parking-place.module';
import CarsModule from 'src/cars/cars.module';
import TaxModule from 'src/tax/tax.module';
import FeesModule from 'src/fees/fees.module';
import DiscountModule from 'src/discount/discount.module';
import { Receipt, ReceiptSchema } from './entities/receipt.entity';
import ReceiptController from './receipt.controller';
import ReceiptService from './receipt.service';
import Util from 'src/Utils/util.util';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Receipt.name, schema: ReceiptSchema },]),
    forwardRef(() => CarsModule),
    ParkingPlaceModule,
    FeesModule,
    TaxModule,
    DiscountModule,
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService, Util],
  exports: [ReceiptService,]
})
export default class ReceiptModule { };