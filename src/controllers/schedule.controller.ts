import { Controller, Get, Post, Param, Patch, Body } from '@nestjs/common';
import { ScheduleService } from '../services/schedule.service';
import { CreateScheduleDto } from '../tools/dto/create-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() dto: CreateScheduleDto) {
    return this.scheduleService.create(dto);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.scheduleService.findById(id);
  }

  @Get('local/:localId')
  findByLocalId(@Param('localId') localId: string) {
    return this.scheduleService.findByLocalId(localId);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.scheduleService.activateById(id);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.scheduleService.deactivateById(id);
  }
}
