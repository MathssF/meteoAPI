import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MeasurementPostService } from '../services/measurement.post.service';
import { MeasurementFetchService } from '../services/measurement.fetchs.service';
import { MeasurementRandomService } from 'src/services/measurement.random.service';
import { FetchMeasurementsDto } from '../tools/dto/fetch-measurements.dto';

/**
 * Controller responsável pelas medições obtidas via integração com a Meteomatics
 * e pelo acesso aos registros já armazenados no banco de dados.
 */
@ApiTags('Medições')
@Controller('measurements')
export class MeasurementController {
  constructor(
    private readonly postService: MeasurementPostService,
    private readonly fetchService: MeasurementFetchService,
    private readonly randomService: MeasurementRandomService,
  ) {}

  /**
   * Faz a coleta de novas medições junto à API da Meteomatics.
   * Recebe como entrada uma lista de parâmetros e localidades
   * e salva os valores obtidos no banco de dados.
   */
  @Post()
  @ApiOperation({
    summary: 'Coletar e registrar novas medições',
    description:
      'Realiza uma requisição à Meteomatics usando os parâmetros e localidades informados. Os resultados são armazenados no banco de dados e vinculados a um lote (batch).',
  })
  async fetch(@Body() dto: FetchMeasurementsDto) {
    return this.postService.executeFetch(dto);
  }

  /**
   * Busca medições salvas no sistema.
   * A pesquisa segue a seguinte ordem de prioridade:
   * `id`  
   * `batchId` (um lote de medições)  
   * `scheduleId` (medições automáticas ligadas a um agendamento)
   */
  @Get()
  @ApiOperation({
    summary: 'Consultar medições registradas',
    description:
      'Retorna medições já armazenadas. A busca segue prioridade: primeiro por `id`, depois por `batchId`, e por último por `scheduleId`.',
  })
  @ApiQuery({ name: 'id', required: false, description: 'Filtrar por ID da medição específica' })
  @ApiQuery({ name: 'batchId', required: false, description: 'Filtrar pelo ID do lote (batch) de medições' })
  @ApiQuery({ name: 'scheduleId', required: false, description: 'Filtrar pelo ID do agendamento que gerou as medições' })
  find(
    @Query('id') id?: string,
    @Query('batchId') batchId?: string,
    @Query('scheduleId') scheduleId?: string,
  ) {
    return this.fetchService.find({ id, batchId, scheduleId });
  }

  /**
   * Gera uma medição única aleatória a partir de um local e um parâmetro.
   * Usa a API Meteomatics para obter o valor atual e cria o registro no banco.
   */
  @Post('random')
  @ApiOperation({
    summary: 'Gerar uma medição aleatória via Meteomatics',
    description:
      'Obtém uma medição em tempo real a partir de um `localId` e `parameterId` fornecidos. Cria a medição no banco e dispara alertas caso existam.',
  })
  @ApiQuery({
    name: 'localId',
    required: true,
    description: 'ID do local de onde a medição será feita',
  })
  @ApiQuery({
    name: 'parameterId',
    required: true,
    description: 'ID do parâmetro a ser medido',
  })
  async random(
    @Query('localId') localId: string,
    @Query('parameterId') parameterId: string,
  ) {
    return this.randomService.execute(localId, parameterId);
  }
}
