/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Discount, DiscountDocument } from './entities/discount.entity';
import CreateDiscountDto from './dto/create-discount.dto';
import UpdateDiscountDto from './dto/update-discount.dto';
import FilterDiscountDataDto from './dto/filter-discount-data.dto';
import { calculateExpiryDate } from '../helpers/helper-functions.helper';



@Injectable()
export default class DiscountService {

  constructor(@InjectModel(Discount.name) private discountModel: Model<DiscountDocument>) { };

  async create(createDiscountDto: CreateDiscountDto) {
    const { date, expiryDate, } = calculateExpiryDate(createDiscountDto.expiryDate, createDiscountDto.expiryTime, createDiscountDto.dayShift);
    createDiscountDto.discountExpiryDate = date;
    createDiscountDto.formattedExpiryDate = expiryDate;
    const newDiscount = await this.discountModel.create(createDiscountDto);
    return newDiscount;
  };

  async totalDiscounts(filterDiscountDataDto: FilterDiscountDataDto) {
    const totalDiscounts = await this.discountModel.countDocuments(filterDiscountDataDto);
    return totalDiscounts;
  };

  async findWithPagination(filterDiscountDataDto: FilterDiscountDataDto, limit: number, skip: number): Promise<Discount[]> {
    const totalDiscounts = await this.discountModel.find(filterDiscountDataDto).sort({ updatedAt: 1 }).limit(limit).skip(skip).select('-__v');
    return totalDiscounts;
  };

  async findAll() {
    const allDiscounts = await this.discountModel.find().sort({ updatedAt: 1 }).select('-__v');
    return allDiscounts;
  };

  async findOne(filterDiscountDataDto: FilterDiscountDataDto) {
    const discount = await this.discountModel.findOne(filterDiscountDataDto).select('-__v');
    return discount;
  };

  async findById(discountId: string) {
    const discount = await this.discountModel.findById(discountId).select('-__v');
    return discount;
  };

  async update(updateDiscountDto: UpdateDiscountDto) {
    if (updateDiscountDto.expiryDate && updateDiscountDto.expiryTime && updateDiscountDto.dayShift) {
      const { date, expiryDate: formattedDate } = calculateExpiryDate(updateDiscountDto.expiryDate, updateDiscountDto.expiryTime, updateDiscountDto.dayShift);
      updateDiscountDto.discountExpiryDate = date;
      updateDiscountDto.formattedExpiryDate = formattedDate;
    };
    const updatedDiscount = await this.discountModel.findByIdAndUpdate(updateDiscountDto.discountId, updateDiscountDto, { new: true });
    return updatedDiscount;
  };

  async remove(discountId: string) {
    const deletedDiscount = await this.discountModel.findByIdAndDelete(discountId);
    return deletedDiscount;
  };

};