/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Receipt, ReceiptDocument } from './database/receipt.database';
import CreateReceiptDto from './dto/create-receipt.dto';
import UpdateReceiptDto from './dto/update-receipt.dto';
import FilterReceiptDataDto from './dto/filter-receipt-data.dto copy';



@Injectable()
export default class ReceiptService {

  constructor(
    @InjectModel(Receipt.name) private receiptModel: Model<ReceiptDocument>,
  ) { };

  async create(createReceiptDto: CreateReceiptDto) {
    const newReceipt = await this.receiptModel.create(createReceiptDto);
    return newReceipt;
  };

  async findAll(filterReceiptDataDto: FilterReceiptDataDto) {
    const receipts = await this.receiptModel.find(filterReceiptDataDto).select('-__v');
    return receipts;
  };

  async totalReceipts(filterReceiptDataDto: FilterReceiptDataDto) {
    const totalReceipts = await this.receiptModel.countDocuments(filterReceiptDataDto);
    return totalReceipts;
  };

  async findWithPagination(filterReceiptDataDto: FilterReceiptDataDto, limit: number, skip: number) {
    const totalReceipts = await this.receiptModel.find(filterReceiptDataDto).limit(limit).skip(skip).select('-__v');
    return totalReceipts;
  };

  async findById(receiptId: string) {
    const receipt = await this.receiptModel.findById(receiptId).select('-__v');
    return receipt;
  };

  async findOne(filterReceiptDataDto: FilterReceiptDataDto) {
    const receipt = await this.receiptModel.findOne(filterReceiptDataDto).select('-__v');
    return receipt;
  };

  async update(updateReceiptDto: UpdateReceiptDto) {
    const updatedReceipt = await this.receiptModel.findOneAndUpdate({ receiptNumber: updateReceiptDto.receiptNumber }, updateReceiptDto, { new: true });
    return updatedReceipt;
  };

};