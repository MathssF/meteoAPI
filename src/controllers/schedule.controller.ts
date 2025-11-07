import { Controller, Get, Post, Patch, Body, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ScheduleService } from '../services/schedule.service';
import { CreateScheduleDto } from '../tools/dto/create-schedule.dto';

/**
 * Controller responsável pelos agendamentos automáticos de coleta de medições.
 * Cada agendamento define quando e onde a coleta será feita, e quais parâmetros devem ser medidos.
 */
@ApiTags('Agendamentos')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  /**
   * Cria um novo agendamento.
   * Cada registro define o horário, o local e o parâmetro que será coletado automaticamente.
   */
  @Post()
  @ApiOperation({
    summary: 'Criar novo agendamento',
    description:
      'Permite registrar um novo agendamento de coleta automática. O corpo da requisição deve incluir o local, o parâmetro e o horário de execução.',
  })
  create(@Body() dto: CreateScheduleDto) {
    return this.scheduleService.create(dto);
  }

  /**
   * Consulta os agendamentos existentes.
   * A busca pode ser filtrada por:
   * 1- `id` 
   * 2- `localId` 
   * 3- `active` 
   */
  @Get()
  @ApiOperation({
    summary: 'Consultar agendamentos',
    description:
      'Retorna os agendamentos cadastrados. Pode ser filtrado por ID, pelo local ou pelo status de atividade.',
  })
  @ApiQuery({ name: 'id', required: false, description: 'Filtra por ID de um agendamento específico' })
  @ApiQuery({ name: 'localId', required: false, description: 'Filtra por ID do local vinculado' })
  @ApiQuery({ name: 'active', required: false, description: 'Filtra por status de ativação (true ou false)' })
  find(
    @Query('id') id?: string,
    @Query('localId') localId?: string,
    @Query('active') active?: string,
  ) {
    return this.scheduleService.find({ id, localId, active });
  }

  /**
   * Ativa manualmente um agendamento específico.
   */
  @Patch(':id/activate')
  @ApiOperation({
    summary: 'Ativar agendamento',
    description: 'Ativa o agendamento informado pelo seu ID.',
  })
  @ApiParam({ name: 'id', description: 'ID do agendamento a ser ativado' })
  activate(@Param('id') id: string) {
    return this.scheduleService.activateById(id);
  }

  /**
   * Desativa manualmente um agendamento específico.
   */
  @Patch(':id/deactivate')
  @ApiOperation({
    summary: 'Desativar agendamento',
    description: 'Desativa o agendamento informado pelo seu ID.',
  })
  @ApiParam({ name: 'id', description: 'ID do agendamento a ser desativado' })
  deactivate(@Param('id') id: string) {
    return this.scheduleService.deactivateById(id);
  }
}
