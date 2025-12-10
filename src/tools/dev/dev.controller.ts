import { Controller, Post, Get, Param, Patch, Body, Put } from '@nestjs/common';
import { DevService } from './dev.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('dev')
export class DevController {
  constructor(private readonly devService: DevService) {}

  // ---- START ----
  @Post('start')
  @ApiOperation({
      summary: 'Iniciar ou Reiniciar o Banco de Dados',
      description:
        'Possui os dados iniciais que serão usados.',
    })
  async start() {
    await this.devService.start();
    return { message: 'Banco Iniciado, ou Reiniciado' };
  }

  // ---- HEALTH ----
  @Get('health')@ApiOperation({
    summary: 'Conferir conexões',
    description:
      'Verifica a conexão com o Banco, e com a API da Meteo, e informa a latência.',
  })
  async getHealth() {
    return this.devService.getHealthStatus();
  }
}
