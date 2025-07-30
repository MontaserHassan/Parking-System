/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import DiscountController from './discount.controller';
import DiscountService from './discount.service';
import { Discount, DiscountSchema } from './database/discount.database';
import Util from 'src/modules/Utils/util.util';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Discount.name, schema: DiscountSchema },]),
  ],
  controllers: [DiscountController],
  providers: [DiscountService, Util,],
  exports: [DiscountService],
})
export default class DiscountModule { };