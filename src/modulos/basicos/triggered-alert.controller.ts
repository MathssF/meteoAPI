import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TriggeredAlertService } from '../../services/triggered-alert.service';
import { CreateTriggeredAlertDto } from '../../tools/dto/create-triggered-alert.dto';

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
}
