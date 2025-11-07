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
   * Gera uma ou várias medições aleatórias a partir de um local e um parâmetro.
   * Pode receber uma data personalizada ou uma quantidade desejada de medições.
   */
  @Post('random')
  @ApiOperation({
    summary: 'Gerar medições aleatórias via Meteomatics',
    description:
      'Obtém uma ou mais medições em tempo real (ou para uma data específica) a partir de um `localId` e `parameterId`. Cria as medições no banco e dispara alertas caso existam.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          format: 'date-time',
          description: 'Data personalizada para a medição (opcional)',
          example: '2025-11-06T12:00:00Z',
        },
        count: {
          type: 'number',
          description: 'Quantidade de medições aleatórias a gerar (opcional)',
          example: 5,
        },
      },
    },
  })
  async random(
    @Body() body?: { date?: string; count?: number },
  ) {
    const count = body?.count && body.count > 0 ? body.count : 1;

    const results = [];
    for (let i = 0; i < count; i++) {
      const result = await this.randomService.execute(body?.date);
      results.push(result);
    }

    return {
      status: 'ok',
      total: results.length,
      results,
    };
  }
}
