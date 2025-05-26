/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Response, Request, HttpStatus, Query, } from '@nestjs/common';

import ReceiptService from './receipt.service';
import Util from 'src/Utils/util.util';
import SuccessResponse from 'src/helpers/success-response.helper';
import CustomExceptionFilter from 'src/Error/error-exception.error';
import { ErrorReceiptMessage, SuccessReceiptMessage } from './Messages/index.message';
// import CreateReceiptDto from './dto/create-receipt.dto';
// import UpdateReceiptDto from './dto/update-receipt.dto';



@Controller('receipt')
export default class ReceiptController {

  constructor(private readonly receiptService: ReceiptService, private readonly util: Util) { };

  @Get('/')
  async findAll(@Request() req, @Response() res, @Query('limit') limit: string, @Query('page') page: string, @Query('status') status: string,) {
    try {
      const query = status ? { statusCode: Number(status) } : {};
      const totalDiscounts = await this.receiptService.totalReceipts(query);
      const pagination = this.util.pagination(totalDiscounts, Number(page), Number(limit));
      const discounts = await this.receiptService.findWithPagination(query, pagination.limit, pagination.skip);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessReceiptMessage.GET_ALL,
        data: {
          currentPage: pagination.currentPage,
          skip: pagination.skip,
          limit: pagination.limit,
          totalPages: pagination.totalPages,
          totalDiscountsForCurrentPage: discounts.length,
          totalDiscounts: pagination.totalDocuments,
          discounts: discounts,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/:receiptId')
  async findOne(@Request() req, @Response() res, @Param('receiptId') receiptId: string) {
    try {
      const receipt = await this.receiptService.findById(receiptId);
      if (!receipt) throw new CustomExceptionFilter(ErrorReceiptMessage.NOT_FOUND, 404, ['discount']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessReceiptMessage.GET_ONE,
        data: {
          receipt: receipt,
        },
      });
    } catch (err) {
      throw err;
    };

  };

};