import { Module } from '@nestjs/common';
import { MeasurementPostService } from '../../services/measurement.post.service';
import { MeasurementFetchService } from '../../services/measurement.fetchs.service';
import { MeasurementRandomService } from 'src/services/measurement.random.service';
import { MeasurementController } from '../../controllers/measurement.controller';

@Module({
  controllers: [MeasurementController],
  providers: [MeasurementPostService, MeasurementFetchService, MeasurementRandomService],
  exports: [MeasurementPostService, MeasurementFetchService, MeasurementRandomService],
})
export class MeasurementModule {}
