import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { FetchMeasurementsDto } from './dto/fetch-measurements.dto';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly service: MeasurementService) {}

  @Post('fetch')
  async fetch(@Body() dto: FetchMeasurementsDto) {
    try {
      return await this.service.getAndPostFromMeteomatics(dto);
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get('by-batch/:batchId')
  findByBatch(@Param('batchId') batchId: string) {
    return this.service.findByBatch(batchId);
  }

  @Get('by-schedule/:scheduleId')
  findBySchedule(@Param('scheduleId') scheduleId: string) {
    return this.service.findBySchedule(scheduleId);
  }
}
