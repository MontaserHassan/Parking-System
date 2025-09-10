/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ParkingPlaceModule from 'src/modules/parking-place/parking-place.module';
import CarsModule from 'src/modules/cars/cars.module';
import TaxModule from 'src/modules/tax/tax.module';
import FeesModule from 'src/modules/fees/fees.module';
import DiscountModule from 'src/modules/discount/discount.module';
import { Receipt, ReceiptSchema } from './repository/receipt.repository';
import ReceiptController from './receipt.controller';
import ReceiptService from './receipt.service';
import Util from 'src/modules/Utils/util.util';



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