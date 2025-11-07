import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AlertService } from '../services/alert.service';
import { CreateAlertDto } from '../tools/dto/create-alert.dto';
import { CreateTriggeredAlertDto } from '../tools/dto/create-triggered-alert.dto';

@Controller('alert')
export class AlertController {
  constructor(private readonly service: AlertService) {}

  @Post()
  createAlert(@Body() dto: CreateAlertDto) {
    return this.service.createAlert(dto);
  }

  @Get()
  findAlerts(
    @Query('id') id?: string,
    @Query('localId') localId?: string,
    @Query('parameterId') parameterId?: string,
  ) {
    return this.service.find({ id, localId, parameterId });
  }

  @Post('triggered')
  createTriggeredAlert(@Body() dto: CreateTriggeredAlertDto) {
    return this.service.createTriggeredAlert(dto);
  }

  @Get('triggered')
  findTriggeredAlerts(
    @Query('id') id?: string,
    @Query('alertId') alertId?: string,
  ) {
    return this.service.findTriggered({ id, alertId });
  }
}