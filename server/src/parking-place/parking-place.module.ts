/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ParkingPlaceController from './parking-place.controller';
import ParkingPlaceService from './parking-place.service';
import { ParkingPlace, ParkingPlaceSchema } from './entities/parking-place.entity';
import Util from 'src/Utils/util.util';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: ParkingPlace.name, schema: ParkingPlaceSchema },]),
  ],
  controllers: [ParkingPlaceController],
  providers: [ParkingPlaceService, Util],
  exports: [ParkingPlaceService],
})
export default class ParkingPlaceModule { };