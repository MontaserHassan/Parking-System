/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Shipment from './entities/shipment.entity';
import CreateShipmentDto from './dto/create-shipment.dto';
import UpdateShipmentDto from './dto/update-shipment.dto';
import FilterShipmentDataDto from './dto/filter-shipment-data.dto';



@Injectable()
export default class ShipmentService {

  constructor(@InjectRepository(Shipment) private shipmentRepository: Repository<Shipment>,) { };

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const shipment = this.shipmentRepository.create(createShipmentDto);
    const savedShipment = await this.shipmentRepository.save(shipment);
    return savedShipment;
  };

  async findAll(): Promise<Shipment[]> {
    const shipments = await this.shipmentRepository.find({ order: { updatedAt: 'ASC' }, });
    return shipments;
  };

  async findOne(filterData: FilterShipmentDataDto): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOneBy(filterData);
    return shipment;
  };

  async findWithPagination(filter: FilterShipmentDataDto, limit: number, skip: number,): Promise<Shipment[]> {
    const shipments = await this.shipmentRepository.find({ where: filter, order: { updatedAt: 'ASC' }, take: limit, skip: skip, });
    return shipments;
  };

  async update(updateShipmentDto: UpdateShipmentDto): Promise<Shipment> {
    const shipment = await this.shipmentRepository.preload(updateShipmentDto);
    const updatedShipment = await this.shipmentRepository.save(shipment);
    return updatedShipment;
  };

  async remove(id: number) {
    const result = await this.shipmentRepository.delete(id);
    return result;
  };

  async count(filterData: FilterShipmentDataDto): Promise<number> {
    const totalCount = await this.shipmentRepository.count({ where: filterData });
    return totalCount;
  };

};