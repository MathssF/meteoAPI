import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { AlertService } from '../services/alert.service';
import { CreateAlertDto } from '../tools/dto/create-alert.dto';
import { CreateTriggeredAlertDto } from '../tools/dto/create-triggered-alert.dto';

@ApiTags('Alertas')
@Controller('alert')
export class AlertController {
  constructor(private readonly service: AlertService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo alerta',
    description:
      'Permite cadastrar um alerta meteorológico para um local e parâmetro específicos, com base em uma condição e valor limite.',
  })
  @ApiBody({ type: CreateAlertDto })
  createAlert(@Body() dto: CreateAlertDto) {
    return this.service.createAlert(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Busca alertas cadastrados',
    description:
      'Permite filtrar alertas existentes por **id**, **localId** ou **parameterId**. '
      + 'Caso nenhum filtro seja informado, retorna todos os alertas cadastrados.',
  })
  @ApiQuery({ name: 'id', required: false, description: 'Filtra pelo ID do alerta' })
  @ApiQuery({ name: 'localId', required: false, description: 'Filtra pelo ID do local' })
  @ApiQuery({ name: 'parameterId', required: false, description: 'Filtra pelo ID do parâmetro' })
  findAlerts(
    @Query('id') id?: string,
    @Query('localId') localId?: string,
    @Query('parameterId') parameterId?: string,
  ) {
    return this.service.find({ id, localId, parameterId });
  }

  @Post('triggered')
  @ApiOperation({
    summary: 'Registra um alerta disparado',
    description:
      'Utilizado para registrar um evento de alerta que foi acionado automaticamente — por exemplo, quando um valor medido ultrapassa o limite definido.',
  })
  @ApiBody({ type: CreateTriggeredAlertDto })
  createTriggeredAlert(@Body() dto: CreateTriggeredAlertDto) {
    return this.service.createTriggeredAlert(dto);
  }

  @Get('triggered')
  @ApiOperation({
    summary: 'Consulta alertas disparados',
    description:
      'Permite listar registros de alertas que já foram acionados. É possível filtrar por **id** ou pelo **alertId** original.',
  })
  @ApiQuery({ name: 'id', required: false, description: 'Filtra pelo ID do alerta disparado' })
  @ApiQuery({ name: 'alertId', required: false, description: 'Filtra pelo ID do alerta original' })
  findTriggeredAlerts(
    @Query('id') id?: string,
    @Query('alertId') alertId?: string,
  ) {
    return this.service.findTriggered({ id, alertId });
  }
}
