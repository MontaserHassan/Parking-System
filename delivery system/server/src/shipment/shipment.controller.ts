/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Response, Request, } from '@nestjs/common';

import ShipmentService from './shipment.service';
import SuccessResponse from 'src/helpers/success-response.helper';
import { calculateTimeUntilDelivery } from 'src/helpers/helper-functions.helper';
import CustomExceptionFilter from 'src/Error/error-exception.error';
import { ErrorShipmentMessage, SuccessShipmentMessage } from './Messages/index.message';
import CreateShipmentDto from './dto/create-shipment.dto';
import UpdateShipmentDto from './dto/update-shipment.dto';



@Controller('shipment')
export default class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) { };

  @Post('/')
  async create(@Request() req, @Response() res, @Body() createShipmentDto: CreateShipmentDto) {
    try {
      const delivery = calculateTimeUntilDelivery(Number(process.env.DELIVERY_ESTIMATED_TIME));
      createShipmentDto.miniumDeliveryTime = delivery.minDays;
      createShipmentDto.maximumDeliveryTime = delivery.maxDays;
      createShipmentDto.minDate = delivery.minDate;
      createShipmentDto.maxDate = delivery.maxDate;
      const newShipment = await this.shipmentService.create(createShipmentDto);
      if (!newShipment) throw new CustomExceptionFilter(ErrorShipmentMessage.NOT_CREATED, HttpStatus.BAD_REQUEST, ['shipment']);
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.CREATED,
        responseMessage: SuccessShipmentMessage.CREATED,
        data: {
          shipment: newShipment,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/')
  async findAll(@Request() req, @Response() res) {
    try {
      const shipments = await this.shipmentService.findAll();
      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessShipmentMessage.GET_ALL,
        data: {
          shipments: shipments,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Get('/:shipmentNumber')
  async findOne(@Request() req, @Response() res, @Param('shipmentNumber') shipmentNumber: string) {
    try {
      const shipment = await this.shipmentService.findOne({ shipmentNumber });
      if (!shipment)
        throw new CustomExceptionFilter(ErrorShipmentMessage.NOT_FOUND, HttpStatus.NOT_FOUND, ['shipment']);

      return SuccessResponse.send(req, res, {
        responseCode: HttpStatus.OK,
        responseMessage: SuccessShipmentMessage.GET_ONE,
        data: {
          shipment,
        },
      });
    } catch (err) {
      throw err;
    };
  };

  @Patch('')
  update(@Body() updateShipmentDto: UpdateShipmentDto) {
    return this.shipmentService.update(updateShipmentDto);
  };

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.shipmentService.remove(+id);
  };

};