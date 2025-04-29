/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ParkingPlaceService from './parking-place.service';
import ParkingPlaceController from './parking-place.controller';
import Util from 'src/Utils/util.util';
import { ParkingPlace, ParkingPlaceSchema } from './entities/parking-place.entity';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: ParkingPlace.name, schema: ParkingPlaceSchema },]),
    ParkingPlaceModule,
  ],
  controllers: [ParkingPlaceController],
  providers: [ParkingPlaceService, Util],
  exports: [ParkingPlaceService],
})
export default class ParkingPlaceModule { };