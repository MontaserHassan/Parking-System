/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Receipt, ReceiptDocument } from './entities/receipt.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';



@Injectable()
export default class ReceiptService {

  constructor(@InjectModel(Receipt.name) private receiptModel: Model<ReceiptDocument>) { };

  async create() { };

  async findAll() { };

  async findOne() { };

  async update() { };

};