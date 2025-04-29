/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Response, HttpStatus, Query, Request, Param } from '@nestjs/common';

import FeesService from './fees.service';
import Util from 'src/Utils/util.util';
import SuccessResponse from 'src/helpers/success-response.helper'; //
import CreateFeeDto from './dto/create-fee.dto';
import UpdateFeeDto from './dto/update-fee.dto';
import CustomExceptionFilter from 'src/Error/error-exception.error';
import { ErrorFeeMessage, SuccessFeeMessage } from './Messages/index.message';



@Controller('fees')
export default class FeesController {

  constructor(private readonly feesService: FeesService, private readonly util: Util) { };

  @Post('/')
  async create(@Request() req, @Response() res, @Body() createFeeDto: CreateFeeDto) {
    try {
      const isFeeExisting = await this.feesService.findOneByProps({ reservationTypeName: createFeeDto.reservationTypeName, reservationType: createFeeDto.reservationType });
      if (isFeeExisting) throw new CustomExceptionFilter(ErrorFeeMessage.ALREADY_EXISTS, 400, ['fee']);
      const fee = await this.feesService.create(createFeeDto);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessFeeMessage.CREATED,
        data: {
          fee: fee,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/')
  async findAll(@Request() req, @Response() res, @Query('limit') limit: string, @Query('page') page: string) {
    try {
      const totalFees = await this.feesService.totalFees();
      const pagination = this.util.pagination(totalFees, Number(page), Number(limit));
      const fees = await this.feesService.findWithPagination({}, pagination.limit, pagination.skip);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessFeeMessage.GET_FEES,
        data: {
          currentPage: pagination.currentPage,
          skip: pagination.skip,
          limit: pagination.limit,
          totalPages: pagination.totalPages,
          totalFeesForCurrentPage: fees.length,
          totalFees: pagination.totalDocuments,
          fees: fees,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/:feesId')
  async findOne(@Request() req, @Response() res, @Param('feesId') feesId: string) {
    try {
      const feeData = await this.feesService.findById(feesId);
      if (!feeData) throw new CustomExceptionFilter(ErrorFeeMessage.NOT_FOUND, 404, ['fee']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessFeeMessage.GET_FEES,
        data: {
          feeData: feeData,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Patch('/')
  async update(@Request() req, @Response() res, @Body() updateFeeDto: UpdateFeeDto) {
    try {
      const isFeeExisting = await this.feesService.findById(updateFeeDto.reservationId);
      if (!isFeeExisting) throw new CustomExceptionFilter(ErrorFeeMessage.NOT_FOUND, 404, ['fee']);
      const fee = await this.feesService.update(updateFeeDto.reservationId, updateFeeDto);
      if (!fee) throw new CustomExceptionFilter(ErrorFeeMessage.NOT_UPDATED, 404, ['fee']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessFeeMessage.UPDATED,
        data: {
          fee: fee,
        },
      });
    } catch (err) {
      throw err;
    };
  };

};