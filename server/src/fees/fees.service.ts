/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Fees, FeesDocument } from './entities/fee.entity';
import CreateFeeDto from './dto/create-fee.dto';
import UpdateFeeDto from './dto/update-fee.dto';
import FilterFeeDataDto from './dto/filter-fee-data.dto';



@Injectable()
export default class FeesService {

  constructor(@InjectModel(Fees.name) private feeModel: Model<FeesDocument>) { };

  async create(createFeeDto: CreateFeeDto) {
    const newFee = await this.feeModel.create(createFeeDto);
    return newFee;
  };

  async totalFees(): Promise<number> {
    const totalFees = await this.feeModel.countDocuments();
    return totalFees;
  };

  async findWithPagination(filterFeeDataDto: FilterFeeDataDto, limit: number, skip: number): Promise<Fees[]> {
    const fees = this.feeModel.find(filterFeeDataDto as Partial<Fees>).sort({ reservationType: 1 }).limit(limit).skip(skip).select('-__v');
    return fees;
  };

  async findAll() {
    const fees = await this.feeModel.find().select('-__v');
    return fees;
  };

  async findOne(filterFeeDataDto: FilterFeeDataDto) {
    const fee = await this.feeModel.findOne(filterFeeDataDto as Partial<Fees>).select('-__v');
    return fee;
  };

  async findByProps(filterFeeDataDto: Partial<FilterFeeDataDto[]>) {
    const requestsData = await this.feeModel.find({ $or: [filterFeeDataDto] }).select('-__v');
    return requestsData;
  };

  async findOneByProps(filterFeeDataDto: Partial<FilterFeeDataDto>) {
    const orConditions = Object.entries(filterFeeDataDto).map(([key, value]) => ({ [key]: value }));
    const requestData = await this.feeModel.findOne({ $or: orConditions }).select('-__v');
    return requestData;
  };

  async findById(feeId: string) {
    const fee = await this.feeModel.findById(feeId).select('-__v');
    return fee;
  };

  async update(id: string, updateFeeDto: UpdateFeeDto) {
    const updatedFee = await this.feeModel.findByIdAndUpdate(id, updateFeeDto, { new: true }).select('-__v');
    return updatedFee;
  };

};