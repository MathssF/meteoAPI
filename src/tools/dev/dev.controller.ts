import { Controller, Post, Get, Param, Patch, Body, Put } from '@nestjs/common';
import { DevService } from './dev.service';
import type { DevCheckDto } from '../dto/dev.dto';

@Controller('dev')
export class DevController {
  constructor(private readonly devService: DevService) {}

  // ---- START ----
  @Post('start')
  async start() {
    await this.devService.start();
    return { message: 'Banco Iniciado, ou Reiniciado' };
  }

  @Get('health')
  async getHealth() {
    return this.devService.getHealthStatus();
  }
}
