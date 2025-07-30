/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Tax, TaxDocument } from './entities/tax.entity';
import CreateTaxDto from './dto/create-tax.dto';
import UpdateTaxDto from './dto/update-tax.dto';
import FilterTaxDataDto from './dto/filter-tax-data.dto';



@Injectable()
export default class TaxService {

  constructor(@InjectModel(Tax.name) private taxModel: Model<TaxDocument>) { };

  async create(createTaxDto: CreateTaxDto) {
    const newTax = await this.taxModel.create(createTaxDto);
    return newTax;
  };

  async totalDiscounts(filterTaxDataDto: FilterTaxDataDto) {
    const totalTaxs = await this.taxModel.countDocuments(filterTaxDataDto);
    return totalTaxs;
  };

  async findWithPagination(filterTaxDataDto: FilterTaxDataDto, limit: number, skip: number): Promise<Tax[]> {
    const totalTaxs = await this.taxModel.find(filterTaxDataDto).sort({ updatedAt: 1 }).limit(limit).skip(skip).select('-__v');
    return totalTaxs;
  };

  async findAll() {
    const allTaxs = await this.taxModel.find().sort({ updatedAt: 1 }).select('-__v');
    return allTaxs;
  };

  async findOne(filterTaxDataDto: FilterTaxDataDto) {
    const tax = await this.taxModel.findOne(filterTaxDataDto).select('-__v');
    return tax;
  };

  async findById(taxId: string) {
    const tax = await this.taxModel.findById(taxId).select('-__v');
    return tax;
  };

  async update(UpdateTaxDto: UpdateTaxDto) {
    const updatedTax = await this.taxModel.findByIdAndUpdate(UpdateTaxDto.taxId, UpdateTaxDto, { new: true });
    return updatedTax;
  };

  async remove(taxIdId: string) {
    const deletedTax = await this.taxModel.findByIdAndDelete(taxIdId);
    return deletedTax;
  };

};