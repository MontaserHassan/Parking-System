/* eslint-disable prettier/prettier */
// src/modules/email/email.consumer.ts
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ContactUS, ContactUSDocument } from '../database/contact-us.database';



@Controller()
export default class SaveMessageConsumer {

    constructor(@InjectModel(ContactUS.name) private contactUsModel: Model<ContactUSDocument>) { };

    @EventPattern('save_message_contact_us')
    async handleSaveMessageConsumer(@Payload() data: Record<string, any>) {
        try {
            return await this.contactUsModel.create(data);
        } catch (error) {
            console.log('error: ', error);
        };
    };

};