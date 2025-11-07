import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementController } from '../../controllers/measurement.controller';
import { MeasurementService } from '../../services/measurement.post.service';

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
