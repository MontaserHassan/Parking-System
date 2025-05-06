/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Response, Request, HttpStatus, Query } from '@nestjs/common';

import CarsService from './cars.service';
import ParkingPlaceService from 'src/parking-place/parking-place.service';
import Util from 'src/Utils/util.util';
import SuccessResponse from 'src/helpers/success-response.helper';
import CustomExceptionFilter from 'src/Error/error-exception.error';
import { ErrorCarMessage, SuccessCarMessage } from './Messages/index.message';
import CreateCarDto from './dto/create-car.dto';
import UpdateCarDto from './dto/update-car.dto';



@Controller('cars')
export default class CarsController {

  constructor(
    private readonly carsService: CarsService,
    private readonly parkingPlace: ParkingPlaceService,
    private readonly util: Util,
  ) { };

  @Post('/')
  async create(@Request() req, @Response() res, @Body() createCarDto: CreateCarDto) {
    try {
      const [car, isParkingPlaceExisting] = await Promise.all([
        this.carsService.findOne({ licensePlate: createCarDto.licensePlate, statusCode: 3 }),
        this.parkingPlace.findById(createCarDto.parkingPlace),
      ]);
      if (car) throw new CustomExceptionFilter(ErrorCarMessage.ALREADY_EXISTS, HttpStatus.NOT_FOUND, ['car']);
      if (!isParkingPlaceExisting) throw new CustomExceptionFilter(ErrorCarMessage.PARKING_PLACE_NOT_FOUND, HttpStatus.NOT_FOUND, ['parkingPlace']);
      if (isParkingPlaceExisting.statusCode === 2) throw new CustomExceptionFilter(ErrorCarMessage.PARKING_PLACE_IS_OCCUPIED, HttpStatus.BAD_REQUEST, ['parkingPlace']);
      const newCar = await this.carsService.create(createCarDto);
      if (!newCar) throw new CustomExceptionFilter(ErrorCarMessage.NOT_CREATED, HttpStatus.BAD_REQUEST, ['car']);
      await this.parkingPlace.update({ placeNumberId: isParkingPlaceExisting._id.toString(), statusCode: 2 });
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.CREATED,
        responseMessage: SuccessCarMessage.CREATED,
        data: {
          newCar: newCar,
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
      const totalCars = await this.carsService.totalCars(query);
      const pagination = this.util.pagination(totalCars, Number(page), Number(limit));
      const cars = await this.carsService.findWithPagination(query, pagination.limit, pagination.skip);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessCarMessage.GET_ALL,
        data: {
          currentPage: pagination.currentPage,
          skip: pagination.skip,
          limit: pagination.limit,
          totalPages: pagination.totalPages,
          totalCarsForCurrentPage: cars.length,
          totalCars: pagination.totalDocuments,
          cars: cars,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/:carId')
  async findOne(@Request() req, @Response() res, @Param('carId') carId: string) {
    try {
      const car = await this.carsService.findById(carId);
      if (!car) throw new CustomExceptionFilter(ErrorCarMessage.NOT_FOUND, 404, ['car']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessCarMessage.GET_ONE,
        data: {
          car: car,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Patch('/')
  async update(@Request() req, @Response() res, @Body() updateCarDto: UpdateCarDto) {
    try {
      const isCarExisting = await this.carsService.findById(updateCarDto.carId);
      if (!isCarExisting) throw new CustomExceptionFilter(ErrorCarMessage.NOT_FOUND, 404, ['car']);
      if (updateCarDto.parkingPlace) {
        const updateParkinPlace = await this.parkingPlace.updateActivePlace({ placeNumberId: updateCarDto.parkingPlace, statusCode: 2 });
        if (!updateParkinPlace) throw new CustomExceptionFilter(ErrorCarMessage.PARKING_PLACE_NOT_UPDATED, 404, ['parkingPlace']);
        await this.parkingPlace.update({ placeNumberId: isCarExisting.parkingPlace['_id'].toString(), statusCode: 1 });
      };
      if (updateCarDto.licensePlate) {
        const car = await this.carsService.findOne({ licensePlate: updateCarDto.licensePlate });
        if (car && car._id.toString() !== updateCarDto.carId) throw new CustomExceptionFilter(ErrorCarMessage.LICENSE_PLATE_ALREADY_EXISTS, 404, ['car']);
      };
      const car = await this.carsService.update(updateCarDto);
      if (!car) throw new CustomExceptionFilter(ErrorCarMessage.NOT_UPDATED, 400, ['car']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessCarMessage.UPDATED,
        data: {
          car: car,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Patch('/car-left/:carId')
  async leftCar(@Request() req, @Response() res, @Param('carId') carId: string) {
    try {
      const isCarExisting = await this.carsService.findById(carId);
      if (!isCarExisting) throw new CustomExceptionFilter(ErrorCarMessage.NOT_FOUND, HttpStatus.NOT_FOUND, ['car']);
      const [updateParkingPlace, updatedCar] = await Promise.all([
        this.parkingPlace.updateActivePlace({ placeNumberId: isCarExisting.parkingPlace['_id'].toString(), statusCode: 1, }),
        this.carsService.update({ carId: isCarExisting._id.toString(), statusCode: 4, })
      ]);
      if (!updateParkingPlace) throw new CustomExceptionFilter(ErrorCarMessage.PARKING_PLACE_NOT_UPDATED, HttpStatus.NOT_FOUND, ['parkingPlace']);
      if (!updatedCar) throw new CustomExceptionFilter(ErrorCarMessage.NOT_UPDATED, HttpStatus.BAD_REQUEST, ['car']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessCarMessage.UPDATED,
        data: {
          updatedCar: updatedCar,
        },
      });
    } catch (err) {
      throw err;
    };
  };

};