/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import ProductModule from '../product/product.module';
import UtilModule from '../Utils/util.module';
import OpenaiController from './openai.controller';
import OpenaiService from './openai.service';
import OpenaiRepository from './openai.repository';



@Module({
  imports: [
    ProductModule,
    UtilModule,
  ],
  controllers: [OpenaiController],
  providers: [OpenaiService, OpenaiRepository],
})
export default class OpenaiModule { };