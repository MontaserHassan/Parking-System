/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request, HttpStatus, Query, } from '@nestjs/common';

import TaxService from './tax.service';
import Util from 'src/modules/Utils/util.util';
import PDFUtil from 'src/modules/Utils/pdf.util';
import SuccessResponse from 'src/core/helpers/success-response.helper';
import CustomExceptionFilter from 'src/core/Error/error-exception.error';
import { ErrorTaxMessage, SuccessTaxMessage } from './Messages/index.message';
import CreateTaxDto from './dto/create-tax.dto';
import UpdateTaxDto from './dto/update-tax.dto';



@Controller('tax')
export default class TaxController {

  constructor(private readonly taxService: TaxService, private readonly util: Util, private readonly pdfUtil: PDFUtil) { };

  @Post('/')
  async create(@Request() req, @Response() res, @Body() createTaxDto: CreateTaxDto) {
    try {
      const newTax = await this.taxService.create(createTaxDto);
      if (!newTax) throw new CustomExceptionFilter(ErrorTaxMessage.NOT_CREATED, HttpStatus.BAD_REQUEST, ['tax']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.CREATED,
        responseMessage: SuccessTaxMessage.CREATED,
        data: {
          newTax: newTax,
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
      const totalTaxs = await this.taxService.totalDiscounts(query);
      const pagination = this.util.pagination(totalTaxs, Number(page), Number(limit));
      const taxs = await this.taxService.findWithPagination(query, pagination.limit, pagination.skip);
      const pdf = await this.pdfUtil.generatePDF('form.html', taxs);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessTaxMessage.GET_ALL,
        data: {
          currentPage: pagination.currentPage,
          skip: pagination.skip,
          limit: pagination.limit,
          totalPages: pagination.totalPages,
          totalTaxsForCurrentPage: taxs.length,
          totalTaxs: pagination.totalDocuments,
          taxs: taxs,
          pdf: pdf,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/:taxId')
  async findOne(@Request() req, @Response() res, @Param('taxId') taxId: string) {
    try {
      const tax = await this.taxService.findById(taxId);
      if (!tax) throw new CustomExceptionFilter(ErrorTaxMessage.NOT_FOUND, 404, ['tax']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessTaxMessage.GET_ONE,
        data: {
          tax: tax,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Patch('/')
  async update(@Request() req, @Response() res, @Body() updateTaxDto: UpdateTaxDto) {
    try {
      const updateTax = await this.taxService.update(updateTaxDto);
      if (!updateTax) throw new CustomExceptionFilter(ErrorTaxMessage.NOT_UPDATED, HttpStatus.BAD_REQUEST, ['tax']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessTaxMessage.GET_ONE,
        data: {
          tax: updateTax,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Delete('/:taxId')
  async remove(@Request() req, @Response() res, @Param('taxId') taxId: string) {
    try {
      const deleteTax = await this.taxService.remove(taxId);
      if (!deleteTax) throw new CustomExceptionFilter(ErrorTaxMessage.NOT_DELETED, HttpStatus.NOT_FOUND, ['tax']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessTaxMessage.DELETED,
        data: {},
      });
    } catch (err) {
      throw err;
    };
  };

}
