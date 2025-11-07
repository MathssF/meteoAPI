import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MeasurementPostService } from '../services/measurement.post.service';
import { MeasurementFetchService } from '../services/measurement.fetchs.service';
import { FetchMeasurementsDto } from '../tools/dto/fetch-measurements.dto';

@Controller('measurements')
export class MeasurementController {
  constructor(
    private readonly postService: MeasurementPostService,
    private readonly fetchService: MeasurementFetchService,
  ) {}

  @Post()
  async fetch(@Body() dto: FetchMeasurementsDto) {
    return this.postService.executeFetch(dto);
  }

  @Get()
  find(
    @Query('id') id?: string,
    @Query('batchId') batchId?: string,
    @Query('scheduleId') scheduleId?: string,
  ) {
    return this.fetchService.find({ id, batchId, scheduleId });
  }
}