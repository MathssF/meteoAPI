import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementPostService } from './measurement.post.service';
import { MeasurementFetchService } from './measurement.fetchs.service';

describe('MeasurementService', () => {
  let service: MeasurementPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasurementPostService],
    }).compile();

    service = module.get<MeasurementPostService>(MeasurementPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
