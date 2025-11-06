import { Module } from '@nestjs/common';
import { MeasurementPostService } from './measurement.post.service';
import { MeasurementFetchService } from './measurement.fetchs.service';
import { MeasurementController } from './measurement.controller';

@Module({
  controllers: [MeasurementController],
  providers: [MeasurementPostService, MeasurementFetchService],
  exports: [MeasurementPostService, MeasurementFetchService],
})
export class MeasurementModule {}
