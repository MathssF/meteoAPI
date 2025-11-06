import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';

describe('MeasurementController', () => {
  let controller: MeasurementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasurementController],
      providers: [MeasurementService],
    }).compile();

    controller = module.get<MeasurementController>(MeasurementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
