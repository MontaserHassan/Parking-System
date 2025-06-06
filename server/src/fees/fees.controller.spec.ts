/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';

import FeesController from './fees.controller';
import FeesService from './fees.service';
import { beforeEach, describe, it } from 'node:test';



describe('FeesController', () => {
  let controller: FeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeesController],
      providers: [FeesService],
    }).compile();

    controller = module.get<FeesController>(FeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
