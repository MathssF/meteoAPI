import { Controller, Post, Get, Param, Patch, Body, Put } from '@nestjs/common';
import { DevService } from './dev.service';
import type { DevCheckDto } from '../dto/dev.dto';

@Controller('dev')
export class DevController {
  constructor(private readonly devService: DevService) {}

  // ---- SEED ----
  @Post('seed')
  async seed() {
    await this.devService.seed();
    return { message: '🌱 Seeds executadas com sucesso!' };
  }

  /*

  // ---- SCHEDULES ----
  @Post('schedules/activate-all')
  async activateAll() {
    return this.devService.activateAllSchedules();
  }

  @Post('schedules/deactivate-all')
  async deactivateAll() {
    return this.devService.deactivateAllSchedules();
  }

  // ---- FORECAST BATCH ----
  @Get('batches')
  async findAllBatches() {
    return this.devService.findAllBatches();
  }

  @Get('batches/:id')
  async findBatchById(@Param('id') id: string) {
    return this.devService.findBatchById(id);
  }

  @Get('batches/date/:date')
  async findBatchesByDate(@Param('date') date: string) {
    return this.devService.findBatchesByDate(date);
  }


  @Put('check')
  async checkDev(@Body() data: DevCheckDto) {
    const { L, P, V } = data;
    let locals: string[] = [];
    let parameters: string[] = [];
    for(const l of L) {
      const point = await this.devService.check('l', l, V);
      if (point) locals.push(l);
      continue
    };
    for(const p of P) {
      const meteo = await this.devService.check('p', p, V);
      if(meteo) parameters.push(p);
      continue
    }
    return {
      locals, parameters
    }
  }

  */
}
