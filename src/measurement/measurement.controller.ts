import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MeasurementPostService } from './measurement.post.service';
import { MeasurementFetchService } from './measurement.fetchs.service';
import { FetchMeasurementsDto } from './dto/fetch-measurements.dto';

@Controller('measurements')
export class MeasurementController {
  constructor(
    private readonly postService: MeasurementPostService,
    private readonly fetchService: MeasurementFetchService
  ) {}

  // POST /measurements
  @Post()
  async fetch(@Body() dto: FetchMeasurementsDto) {
    try {
      return await this.postService.getAndPostFromMeteomatics(dto);
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  // GET /measurement
  @Get()
  findAll() {
    return this.fetchService.findAll();
  }

  // GET /measurement/[id]
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.fetchService.findById(id);
  }

  // GET /measurement/by-batch/[batchId]
  @Get('by-batch/:batchId')
  findByBatch(@Param('batchId') batchId: string) {
    return this.fetchService.findByBatch(batchId);
  }

  // GET /measurement/by-schedule/[scheduleId]
  @Get('by-schedule/:scheduleId')
  findBySchedule(@Param('scheduleId') scheduleId: string) {
    return this.fetchService.findBySchedule(scheduleId);
  }
}
