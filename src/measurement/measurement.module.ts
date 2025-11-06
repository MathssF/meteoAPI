import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';

@Module({
  controllers: [MeasurementController],
  providers: [MeasurementService],
})
export class MeasurementModule {}
