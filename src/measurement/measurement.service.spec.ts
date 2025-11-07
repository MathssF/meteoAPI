import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementPostService } from './measurement.post.service';
import { MeasurementFetchService } from './measurement.fetchs.service';

describe('MeasurementService', () => {
  let postService: MeasurementPostService;
  let fetchService: MeasurementFetchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasurementPostService],
    }).compile();

    postService = module.get<MeasurementPostService>(MeasurementPostService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });
});
