/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Response, HttpStatus, Query, Request, Req } from '@nestjs/common';

import ParkingPlaceService from './parking-place.service';
import Util from 'src/modules/Utils/util.util';
import SuccessResponse from 'src/core/helpers/success-response.helper';
import CustomExceptionFilter from 'src/core/Error/error-exception.error';
import { ErrorParkingPlaceMessage, SuccessParkingPlaceMessage } from './Messages/index.message';
import CreateParkingPlaceDto from './dto/create-parking-place.dto';
import UpdateParkingPlaceDto from './dto/update-parking-place.dto';



@Controller('parking-place')
export default class ParkingPlaceController {

  constructor(private readonly parkingPlaceService: ParkingPlaceService, private readonly util: Util) { };

  @Post('/')
  async create(@Request() req, @Response() res, @Body() createParkingPlacesDto: CreateParkingPlaceDto) {
    try {
      const parkingPlacesToCreate = [];
      for (const createParkingPlaceDto of createParkingPlacesDto.newParkingPlaces) {
        const isParkingPlaceExisting = await this.parkingPlaceService.findOne({ placeNumber: createParkingPlaceDto.placeNumber, floorNumber: createParkingPlaceDto.floorNumber, });
        if (isParkingPlaceExisting) throw new CustomExceptionFilter(`${ErrorParkingPlaceMessage.PLACES_ALREADY_EXIST} (PlaceNumber: ${createParkingPlaceDto.placeNumber}, FloorNumber: ${createParkingPlaceDto.floorNumber})`, 400, ['placeNumber', 'floorNumber']);
        parkingPlacesToCreate.push(createParkingPlaceDto);
      };
      const newParkingPlaces = await this.parkingPlaceService.create(parkingPlacesToCreate);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.CREATED,
        responseMessage: SuccessParkingPlaceMessage.CREATED,
        data: {
          newParkingPlaces: newParkingPlaces,
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
      const totalParkingPlace = await this.parkingPlaceService.totalParkingPlaces(query);
      const pagination = this.util.pagination(totalParkingPlace, Number(page), Number(limit));
      const parkingPlaces = await this.parkingPlaceService.findWithPagination(query, pagination.limit, pagination.skip);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessParkingPlaceMessage.GET_ALL,
        data: {
          currentPage: pagination.currentPage,
          skip: pagination.skip,
          limit: pagination.limit,
          totalPages: pagination.totalPages,
          totalParkingPlacesForCurrentPage: parkingPlaces.length,
          totalParkingPlaces: pagination.totalDocuments,
          parkingPlaces: parkingPlaces,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/:parkingPlaceId')
  async findOne(@Request() req, @Response() res, @Param('parkingPlaceId') parkingPlaceId: string) {
    try {
      const parkingPlace = await this.parkingPlaceService.findById(parkingPlaceId);
      if (!parkingPlace) throw new CustomExceptionFilter(ErrorParkingPlaceMessage.NOT_FOUND, 404, ['parkingPlace']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessParkingPlaceMessage.GET_ONE,
        data: {
          ParkingPlace: parkingPlace,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Patch('/')
  async update(@Request() req, @Response() res, @Body() updateParkingPlaceDto: UpdateParkingPlaceDto) {
    try {
      const isParkingPlaceExisting = await this.parkingPlaceService.findById(updateParkingPlaceDto.placeNumberId);
      if (!isParkingPlaceExisting) throw new CustomExceptionFilter(ErrorParkingPlaceMessage.NOT_FOUND, 404, ['parkingPlace']);
      const isPlaceNumberChanged = updateParkingPlaceDto.placeNumber !== isParkingPlaceExisting.placeNumber;
      const isFloorNumberChanged = updateParkingPlaceDto.floorNumber !== isParkingPlaceExisting.floorNumber;
      if (isPlaceNumberChanged || isFloorNumberChanged) {
        const duplicatePlace = await this.parkingPlaceService.findOne({ placeNumber: updateParkingPlaceDto.placeNumber, floorNumber: updateParkingPlaceDto.floorNumber });
        if (duplicatePlace && duplicatePlace.id !== updateParkingPlaceDto.placeNumberId) throw new CustomExceptionFilter(ErrorParkingPlaceMessage.PLACE_ALREADY_EXIST, 400, ['placeNumber', 'floorNumber']);
      };
      const updatedParkingPlace = await this.parkingPlaceService.update(updateParkingPlaceDto);
      if (!updatedParkingPlace) throw new CustomExceptionFilter(ErrorParkingPlaceMessage.NOT_UPDATED, 404, ['fee']);
      return SuccessResponse.send(res, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessParkingPlaceMessage.UPDATED,
        data: {
          parkingPlace: updatedParkingPlace,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Delete('/:parkinPlaceId')
  async remove(@Request() req, @Response() res, @Param('parkinPlaceId') parkinPlaceId: string) {
    try {
      const parkingPlace = await this.parkingPlaceService.remove(parkinPlaceId);
      if (!parkingPlace) throw new CustomExceptionFilter(ErrorParkingPlaceMessage.NOT_DELETED, 404, ['parkingPlace']);
      return SuccessResponse.send(res, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessParkingPlaceMessage.DELETED,
        data: {},
      });
    } catch (err) {
      throw err;
    };
  };

};