import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { FetchMeasurementsDto } from './dto/fetch-measurements.dto';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly service: MeasurementService) {}

  // GET /measurements
  @Post()
  async fetch(@Body() dto: FetchMeasurementsDto) {
    try {
      return await this.service.getAndPostFromMeteomatics(dto);
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  // GET /measurement
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET /measurement/[id]
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  // GET /measurement/by-batch/[batchId]
  @Get('by-batch/:batchId')
  findByBatch(@Param('batchId') batchId: string) {
    return this.service.findByBatch(batchId);
  }

  // GET /measurement/by-schedule/[scheduleId]
  @Get('by-schedule/:scheduleId')
  findBySchedule(@Param('scheduleId') scheduleId: string) {
    return this.service.findBySchedule(scheduleId);
  }
}
