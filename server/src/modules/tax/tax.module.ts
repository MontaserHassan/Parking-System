/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import TaxController from './tax.controller';
import TaxService from './tax.service';
import { Tax, TaxSchema } from './entities/tax.entity';
import Util from 'src/modules/Utils/util.util';



@Module({

  imports: [
    MongooseModule.forFeature([{ name: Tax.name, schema: TaxSchema },]),
  ],
  controllers: [TaxController],
  providers: [TaxService, Util],
  exports: [TaxService],
})
export default class TaxModule { };