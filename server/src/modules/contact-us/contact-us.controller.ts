/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Req, Res, Inject, } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';

import Util from 'src/modules/Utils/util.util';
import ContactUsService from './contact-us.service';
import CreateContactUsDto from './dto/create-contact-us.dto';



@Controller('contact-us')
export default class ContactUsController {
  constructor(
    private readonly util: Util,
    private readonly contactUSService: ContactUsService,
    // @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) { };

  @Post('/')
  async create(@Req() req: Request, @Res() res: Response, @Body() createContactUsDto: CreateContactUsDto) {
    try {
      const messageId = this.util.generateId();
      const emailMessage = {
        email: createContactUsDto.email,
        userName: createContactUsDto.userName,
        phoneNumber: createContactUsDto.phoneNumber,
        // subject: 'Activate Your ISEG Halal Account',
        // template: 'welcome-your-account.template.html',
        messageId: messageId,
        content: createContactUsDto.content,
      };
      // this.client.emit('send_email', emailMessage);
      // this.client.emit('save_message_contact_us', emailMessage);
      await this.contactUSService.create(emailMessage);
      const response = {
        responseCode: 200,
        responseMessage: `Your Request was created successfully and the request number is ${messageId}`,
        data: {
          message: createContactUsDto,
        },
      };
      return res.status(response.responseCode).send(response);
    } catch (err) {
      throw err;
    };
  };

};