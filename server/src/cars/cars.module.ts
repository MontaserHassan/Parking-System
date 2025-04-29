/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ParkingPlaceModule from 'src/parking-place/parking-place.module';
import CarsController from './cars.controller';
import CarsService from './cars.service';
import Util from 'src/Utils/util.util';
import { Car, CarSchema } from './entities/car.entity';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema },]),
    ParkingPlaceModule,
  ],
  controllers: [CarsController],
  providers: [CarsService, Util],
  exports: [CarsService,]
})
export default class CarsModule { };