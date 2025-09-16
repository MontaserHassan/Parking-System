/* eslint-disable prettier/prettier */
import { Controller, Post, HttpStatus, Response, Request, } from '@nestjs/common';

import OpenaiService from './openai.service';
import SuccessResponse from 'src/core/helpers/success-response.helper';
import CustomExceptionFilter from 'src/core/Error/error-exception.error';
import { SuccessOpenaiMessage, ErrorOpenaiMessage } from './Messages/index.message';


@Controller('openai')
export default class OpenaiController {

  constructor(
    private readonly openaiService: OpenaiService,
  ) { };

  @Post('/')
  async create(@Request() req, @Response() res,) {
    try {
      const summary = await this.openaiService.generateInventorySummary();
      if (!summary) throw new CustomExceptionFilter(ErrorOpenaiMessage.PDF_CREATION_FAILED, HttpStatus.BAD_REQUEST, ['openai']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessOpenaiMessage.PDF_CREATED,
        data: {
          summary,
        },
      });
    } catch (err) {
      throw err;
    };
  };
};