/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import ReceiptService from './receipt.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';



@Controller('receipt')
export default class ReceiptController {

  constructor(private readonly receiptService: ReceiptService) { };

  @Post('/')
  create(@Body() createReceiptDto: CreateReceiptDto) { };

  @Get('/')
  findAll() {
  };

  @Get('/:receiptId')
  findOne(@Param('receiptId') receiptId: string) { };

  @Patch('/')
  update(@Body() updateReceiptDto: UpdateReceiptDto) { };

};