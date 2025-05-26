/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request, HttpStatus, Query, } from '@nestjs/common';

import DiscountService from './discount.service';
import Util from 'src/Utils/util.util';
import SuccessResponse from 'src/helpers/success-response.helper';
import CustomExceptionFilter from 'src/Error/error-exception.error';
import { ErrorDiscountMessage, SuccessDiscountMessage } from './Messages/index.message';
import CreateDiscountDto from './dto/create-discount.dto';
import UpdateDiscountDto from './dto/update-discount.dto';



@Controller('discount')
export default class DiscountController {

  constructor(private readonly discountService: DiscountService, private readonly util: Util,) { };

  @Post('/')
  async create(@Request() req, @Response() res, @Body() createDiscountDto: CreateDiscountDto) {
    try {
      const newDiscount = await this.discountService.create(createDiscountDto);
      if (!newDiscount) throw new CustomExceptionFilter(ErrorDiscountMessage.NOT_CREATED, HttpStatus.BAD_REQUEST, ['discount']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.CREATED,
        responseMessage: SuccessDiscountMessage.CREATED,
        data: {
          newDiscount: newDiscount,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/')
  async findAll(@Request() req, @Response() res, @Query('limit') limit: string, @Query('page') page: string, @Query('status') status: string,) {
    try {
      const query = status ? { statusCode: Number(status) } : {};
      const totalDiscounts = await this.discountService.totalDiscounts(query);
      const pagination = this.util.pagination(totalDiscounts, Number(page), Number(limit));
      const discounts = await this.discountService.findWithPagination(query, pagination.limit, pagination.skip);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessDiscountMessage.GET_ALL,
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

  @Get('/:discountId')
  async findOne(@Request() req, @Response() res, @Param('discountId') discountId: string) {
    try {
      const car = await this.discountService.findById(discountId);
      if (!car) throw new CustomExceptionFilter(ErrorDiscountMessage.NOT_FOUND, 404, ['discount']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessDiscountMessage.GET_ONE,
        data: {
          car: car,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Patch('/')
  async update(@Request() req, @Response() res, @Body() updateDiscountDto: UpdateDiscountDto) {
    try {
      const isDiscountExisting = await this.discountService.findById(updateDiscountDto.discountId);
      if (!isDiscountExisting) throw new CustomExceptionFilter(ErrorDiscountMessage.NOT_FOUND, HttpStatus.NOT_FOUND, ['discount']);
      const updateReceipt = await this.discountService.update(updateDiscountDto);
      if (!updateReceipt) throw new CustomExceptionFilter(ErrorDiscountMessage.NOT_UPDATED, HttpStatus.BAD_REQUEST, ['discount']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessDiscountMessage.GET_ONE,
        data: {
          discount: updateReceipt,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Delete('/:discountId')
  async remove(@Request() req, @Response() res, @Param('discountId') discountId: string) {
    try {
      const deleteDiscount = await this.discountService.remove(discountId);
      if (!deleteDiscount) throw new CustomExceptionFilter(ErrorDiscountMessage.NOT_DELETED, HttpStatus.NOT_FOUND, ['discount']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessDiscountMessage.DELETED,
        data: {},
      });
    } catch (err) {
      throw err;
    };
  };

};