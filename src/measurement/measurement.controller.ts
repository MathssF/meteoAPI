import { Controller, Post, Body } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { FetchMeasurementsDto } from './dto/fetch-measurements.dto';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly service: MeasurementService) {}

  @Post('fetch')
  fetch(@Body() dto: FetchMeasurementsDto) {
    return this.service.fetchFromMeteomatics(dto);
  }
}
