import { Module } from '@nestjs/common';
import { MeasurementPostService } from '../../services/measurement.post.service';
import { MeasurementFetchService } from '../../services/measurement.fetchs.service';
import { MeasurementController } from '../../controllers/measurement.controller';

@Module({
  controllers: [MeasurementController],
  providers: [MeasurementPostService, MeasurementFetchService],
  exports: [MeasurementPostService, MeasurementFetchService],
})
export class MeasurementModule {}
