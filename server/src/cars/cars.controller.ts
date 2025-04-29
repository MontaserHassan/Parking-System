/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Response, Request, HttpStatus, Query } from '@nestjs/common';

import CarsService from './cars.service';
import Util from 'src/Utils/util.util';
import SuccessResponse from 'src/helpers/success-response.helper';
import CreateCarDto from './dto/create-car.dto';
import UpdateCarDto from './dto/update-car.dto';
import CustomExceptionFilter from 'src/Error/error-exception.error';
import { ErrorCarMessage, SuccessCarMessage } from './Messages/index.message';



@Controller('cars')
export default class CarsController {

  constructor(private readonly carsService: CarsService, private readonly util: Util) { };

  @Post('/')
  async create(@Request() req, @Response() res, @Body() createCarDto: CreateCarDto) {
    try {
      const car = await this.carsService.findOne({ licensePlate: createCarDto.licensePlate });
      if (!car) throw new CustomExceptionFilter(ErrorCarMessage.NOT_FOUND, 404, ['car']);
      const newCar = await this.carsService.create(createCarDto);
      if (!newCar) throw new CustomExceptionFilter(ErrorCarMessage.NOT_CREATED, 400, ['car']);
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
          Cars: cars,
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
      const car = await this.carsService.update(updateCarDto);
      if (!car) throw new CustomExceptionFilter(ErrorCarMessage.NOT_UPDATED, 400, ['car']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessCarMessage.UPDATED,
        data: {
        },
      });
    } catch (err) {
      throw err;
    };
  };

};