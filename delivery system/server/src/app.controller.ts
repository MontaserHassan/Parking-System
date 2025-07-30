/* eslint-disable prettier/prettier */
import { Controller, Get, HttpStatus, Request, Response, } from '@nestjs/common';

import AppService from './app.service';
import SuccessResponse from './helpers/success-response.helper';



@Controller()
export default class AppController {

  constructor(private readonly appService: AppService) { };

  @Get('/health')
  getHello(@Request() req, @Response() res,): Record<string, any> {
    const responseData = this.appService.getHello();
    return SuccessResponse.send(req, res, {
      responseCode: HttpStatus.CREATED,
      responseMessage: responseData,
      data: {},
    });
  };
};