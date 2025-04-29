/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import FeesService from './fees.service';
import FeesController from './fees.controller';
import Util from 'src/Utils/util.util';
import { Fees, FeesSchema } from './entities/fee.entity';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fees.name, schema: FeesSchema }]),
  ],
  controllers: [FeesController],
  providers: [FeesService, Util],
})
export default class FeesModule { };