import { Controller, Get, Post, Patch, Body, Query, Param } from '@nestjs/common';
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
  find(
    @Query('id') id?: string,
    @Query('localId') localId?: string,
    @Query('active') active?: string,
  ) {
    return this.scheduleService.find({ id, localId, active });
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