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
}
