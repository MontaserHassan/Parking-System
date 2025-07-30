import { Test, TestingModule } from '@nestjs/testing';
import { ParkingPlaceController } from './parking-place.controller';
import { ParkingPlaceService } from './parking-place.service';

describe('ParkingPlaceController', () => {
  let controller: ParkingPlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingPlaceController],
      providers: [ParkingPlaceService],
    }).compile();

    controller = module.get<ParkingPlaceController>(ParkingPlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
