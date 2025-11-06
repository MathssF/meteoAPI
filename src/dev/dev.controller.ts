import { Controller, Post, Get, Param } from '@nestjs/common';
import { MainService } from './dev.service';

@Controller('dev')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  // ---- SEED ----
  @Post('seed')
  async seed() {
    await this.mainService.seed();
    return { message: '🌱 Seeds executadas com sucesso!' };
  }

  // ---- SCHEDULES ----
  @Post('schedules/activate-all')
  async activateAll() {
    return this.mainService.activateAllSchedules();
  }

  @Post('schedules/deactivate-all')
  async deactivateAll() {
    return this.mainService.deactivateAllSchedules();
  }

  // ---- FORECAST BATCH ----
  @Get('batches')
  async findAllBatches() {
    return this.mainService.findAllBatches();
  }

  @Get('batches/:id')
  async findBatchById(@Param('id') id: string) {
    return this.mainService.findBatchById(id);
  }

  @Get('batches/date/:date')
  async findBatchesByDate(@Param('date') date: string) {
    return this.mainService.findBatchesByDate(date);
  }
}
