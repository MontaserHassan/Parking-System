/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import RabbitMqmoduleModule from '../rabbit-mqmodule/rabbit-mqmodule.module';
import ContactUsService from './contact-us.service';
import ContactUsController from './contact-us.controller';
import { ContactUS, ContactUSSchema } from './database/contact-us.database';
import Util from 'src/modules/Utils/util.util';
import UtilModule from '../Utils/util.module';
import EmailConsumer from './consumer/contact-us.consumer';
import SaveMessageConsumer from './consumer/save-message-contact-us.consumer';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forFeature([{ name: ContactUS.name, schema: ContactUSSchema }]),
    UtilModule,
    RabbitMqmoduleModule,
  ],
  controllers: [ContactUsController, EmailConsumer, SaveMessageConsumer,],
  providers: [ContactUsService, Util,],
})
export default class ContactUsModule { };