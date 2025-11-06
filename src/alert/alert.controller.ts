import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  // POST /alert
  @Post()
    create(@Body() dto: CreateAlertDto) {
      return this.alertService.create(dto);
    }

  // GET /alert
  @Get()
  findAll() {
    return this.alertService.findAll();
  }

  // GET /alert/by-local/:localId
  @Get('by-local/:localId')
  findByLocal(@Param('localId') localId: string) {
    return this.alertService.findByLocalId(localId);
  }

  // GET /alert/by-parameter/:parameterId
  @Get('by-parameter/:parameterId')
  findByParameter(@Param('parameterId') parameterId: string) {
    return this.alertService.findByParameterId(parameterId);
  }

  

  // GET /alert/filter?localId=...&parameterId=...
  @Get('filter')
  findByLocalAndParameter(
    @Query('localId') localId: string,
    @Query('parameterId') parameterId: string,
  ) {
    return this.alertService.findByLocalAndParameter(localId, parameterId);
  }
}
