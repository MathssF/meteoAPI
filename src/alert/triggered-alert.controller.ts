import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TriggeredAlertService } from './triggered-alert.service';
import { CreateTriggeredAlertDto } from './dto/create-triggered-alert.dto';

@Controller('triggered-alert')
export class TriggeredAlertController {
  constructor(private readonly service: TriggeredAlertService) {}

  @Post()
  create(@Body() dto: CreateTriggeredAlertDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get('by-alert/:alertId')
  findByAlertId(@Param('alertId') alertId: string) {
    return this.service.findByAlertId(alertId);
  }

  @Get('by-local/:localId')
  findByLocalId(@Param('localId') localId: string) {
    return this.service.findByLocalId(localId);
  }
}
