import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
    create(@Body() dto: CreateAlertDto) {
      return this.alertService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.alertService.findAll();
    }
}
