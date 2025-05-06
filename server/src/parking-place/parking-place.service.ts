/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ParkingPlace, ParkingPlaceDocument } from './entities/parking-place.entity'
import CreateParkingPlaceDto from './dto/create-parking-place.dto';
import UpdateParkingPlaceDto from './dto/update-parking-place.dto';
import UpdateParkingPlaceByPropsDto from './dto/update-by-props-parking-place.dto';
import FilterParkingPlaceDataDto from './dto/filter-parking-place-data.dto';



@Injectable()
export default class ParkingPlaceService {

  constructor(@InjectModel(ParkingPlace.name) private parkingPlaceModel: Model<ParkingPlaceDocument>) { };

  async create(createParkingPlaceDto: CreateParkingPlaceDto[]) {
    const createPromises = createParkingPlaceDto.map(dto => {
      const place = new this.parkingPlaceModel(dto);
      return place.save();
    });
    const savedPlaces = await Promise.all(createPromises);
    return savedPlaces;
  };

  async totalParkingPlaces(filterParkingPlaceDataDto: FilterParkingPlaceDataDto): Promise<number> {
    const totalParkingPlaces = await this.parkingPlaceModel.countDocuments(filterParkingPlaceDataDto);
    return totalParkingPlaces;
  };

  async findWithPagination(filterParkingPlaceDataDto: FilterParkingPlaceDataDto, limit: number, skip: number): Promise<ParkingPlace[]> {
    const totalParkingPlaces = this.parkingPlaceModel.find(filterParkingPlaceDataDto).sort({ floorNumber: 1, placeNumber: 1 }).limit(limit).skip(skip).select('-__v');
    return totalParkingPlaces;
  };

  async findAll() {
    const parkingPlaces = await this.parkingPlaceModel.find().sort({ floorNumber: 1, placeNumber: 1 }).select('-__v');
    return parkingPlaces;
  };

  async findOne(filterParkingPlaceDataDto: FilterParkingPlaceDataDto) {
    const parkingPlace = await this.parkingPlaceModel.findOne(filterParkingPlaceDataDto).select('-__v');
    return parkingPlace;
  };

  async findByProps(filterParkingPlaceDataDto: Partial<FilterParkingPlaceDataDto[]>) {
    const requestsData = await this.parkingPlaceModel.find({ $or: [filterParkingPlaceDataDto] }).sort({ floorNumber: 1, placeNumber: 1 }).select('-__v');
    return requestsData;
  };

  async findOneByProps(filterParkingPlaceDataDto: Partial<FilterParkingPlaceDataDto>) {
    const orConditions = Object.entries(filterParkingPlaceDataDto).map(([key, value]) => ({ [key]: value }));
    const requestData = await this.parkingPlaceModel.findOne({ $or: orConditions }).select('-__v');
    return requestData;
  };

  async findById(parkingPlaceId: string) {
    const parkingPlace = await this.parkingPlaceModel.findById(parkingPlaceId).select('-__v');
    return parkingPlace;
  };

  async update(updateParkingPlaceDto: UpdateParkingPlaceDto) {
    const updatedParkingPlace = await this.parkingPlaceModel.findByIdAndUpdate(updateParkingPlaceDto.placeNumberId, updateParkingPlaceDto, { new: true }).select('-__v');
    return updatedParkingPlace;
  };

  async updateActivePlace(updateParkingPlaceDto: UpdateParkingPlaceDto) {
    const updatedParkingPlace = await this.parkingPlaceModel.findOneAndUpdate({ _id: updateParkingPlaceDto.placeNumberId, statusCode: 1 }, updateParkingPlaceDto, { new: true }).select('-__v');
    return updatedParkingPlace;
  };

  async updateByProps(updateParkingPlaceByPropsDto: UpdateParkingPlaceByPropsDto) {
    const updatedParkingPlace = await this.parkingPlaceModel.findOneAndUpdate({ [updateParkingPlaceByPropsDto.propName]: updateParkingPlaceByPropsDto.propValue }, updateParkingPlaceByPropsDto, { new: true }).select('-__v');
    return updatedParkingPlace;
  };

  async remove(parkingPlaceId: string) {
    const deletedParkingPlace = await this.parkingPlaceModel.findOneAndDelete({ _id: parkingPlaceId, statusCode: 1 }).select('-__v');
    return deletedParkingPlace;
  };

};