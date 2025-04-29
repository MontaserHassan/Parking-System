/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Req, Res, } from '@nestjs/common';
import { Request, Response } from 'express';

import ContactUsService from './contact-us.service';
import Util from 'src/Utils/util.util';
import CreateContactUsDto from './dto/create-contact-us.dto';



@Controller('contact-us')
export default class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService, private readonly util: Util) { };

  @Post('/')
  async create(@Req() req: Request, @Res() res: Response, @Body() createContactUsDto: CreateContactUsDto) {
    try {
      const messageId = this.util.generateId();
      createContactUsDto.messageId = messageId;
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