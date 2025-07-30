/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Car, CarDocument } from './database/car.database';
import CreateCarDto from './dto/create-car.dto';
import UpdateCarDto from './dto/update-car.dto';
import FilterCarDataDto from './dto/filter-car-data.dto';
import UpdateCarByPropsDto from './dto/update-car-by-props.dto';



@Injectable()
export default class CarsService {

    constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) { };

    async create(createCarDto: CreateCarDto) {
        const newCar = await this.carModel.create(createCarDto);
        return await this.findById(newCar._id.toString());
    };

    async totalCars(filterCarDataDto: FilterCarDataDto): Promise<number> {
        const totalCars = await this.carModel.countDocuments(filterCarDataDto);
        return totalCars;
    };

    async findWithPagination(filterCarDataDto: FilterCarDataDto, limit: number, skip: number): Promise<Car[]> {
        const totalCars = await this.carModel.find(filterCarDataDto).sort({ licensePlate: 1 }).limit(limit).skip(skip).populate('parkingPlace').select('-__v');
        return totalCars;
    };

    async findAll() {
        const cars = await this.carModel.find().sort({ licensePlate: 1 }).populate('parkingPlace').select('-__v');
        return cars;
    };

    async findOne(filterCarDataDto: FilterCarDataDto) {
        const car = await this.carModel.findOne(filterCarDataDto).populate('parkingPlace').select('-__v');
        return car;
    };

    async findByProps(filterCarDataDto: Partial<FilterCarDataDto[]>) {
        const requestsData = await this.carModel.find({ $or: [filterCarDataDto] }).sort({ licensePlate: 1 }).select('-__v');
        return requestsData;
    };

    async findOneByProps(filterCarDataDto: Partial<FilterCarDataDto>) {
        const orConditions = Object.entries(filterCarDataDto).map(([key, value]) => ({ [key]: value }));
        const requestData = await this.carModel.findOne({ $or: orConditions }).populate('parkingPlace').select('-__v');
        return requestData;
    };

    async findById(carId: string) {
        const car = await this.carModel.findById(carId).populate('parkingPlace').select('-__v');
        return car;
    };

    async update(updateCarDto: UpdateCarDto) {
        const updatedCar = await this.carModel.findByIdAndUpdate(updateCarDto.carId, updateCarDto, { new: true }).populate('parkingPlace').select('-__v');
        return updatedCar;
    };

    async updateOne(updateCarDto: UpdateCarDto) {
        const updatedCar = await this.carModel.findOneAndUpdate({ _id: updateCarDto.carId, statusCode: 4 }, updateCarDto, { new: true }).select('-__v');
        return updatedCar;
    };

    async updateByProps(updateCarByPropsDto: UpdateCarByPropsDto) {
        const updatedCar = await this.carModel.findOneAndUpdate({ [updateCarByPropsDto.propName]: updateCarByPropsDto.propValue }, updateCarByPropsDto, { new: true }).populate('parkingPlace').select('-__v');
        return updatedCar;
    };

    async remove(carId: string) {
        const deletedCar = await this.carModel.findOneAndDelete({ _id: carId, statusCode: 3 }).select('-__v');
        return deletedCar;
    };

};