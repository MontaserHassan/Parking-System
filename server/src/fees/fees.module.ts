/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import FeesController from './fees.controller';
import FeesService from './fees.service';
import { Fees, FeesSchema } from './entities/fee.entity';
import Util from 'src/Utils/util.util';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fees.name, schema: FeesSchema }]),
  ],
  controllers: [FeesController],
  providers: [FeesService, Util],
  exports: [FeesService],
})
export default class FeesModule { };