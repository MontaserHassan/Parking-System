/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ContactUS, ContactUSDocument } from './database/contact-us.database';
import CreateContactUsDto from './dto/create-contact-us.dto';



@Injectable()
export default class ContactUsService { 

      constructor(@InjectModel(ContactUS.name) private contactUsModel: Model<ContactUSDocument>) { }

      async create(createContactUsDto: CreateContactUsDto) {
        const createdContactUS = await this.contactUsModel.create(createContactUsDto);
        return createdContactUS;
      };
    
      async findAll(): Promise<ContactUS[]> {
        const allContactUS = await this.contactUsModel.find().select('-__v').sort({ createdAt: -1 });
        return allContactUS;
      };
    
};