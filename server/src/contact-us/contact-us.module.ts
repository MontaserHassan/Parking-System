/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ContactUsService from './contact-us.service';
import ContactUsController from './contact-us.controller';
import Util from 'src/Utils/util.util';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
  ],
  controllers: [ContactUsController],
  providers: [ContactUsService, Util,],
})
export default class ContactUsModule { };