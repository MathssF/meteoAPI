import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ParameterService } from '../services/parameter.service';
import { CreateParameterDto } from '../tools/dto/create-parameter.dto';

/**
 * Controller responsável pelos parâmetros meteorológicos utilizados nas medições.
 * Cada parâmetro possui um identificador (id), código, nome e unidade de medida.
 */
@ApiTags('Parâmetros')
@Controller('parameter')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}

  /**
   * Cadastra um novo parâmetro meteorológico na persistência.
   */
  @Post()
  @ApiOperation({
    summary: 'Cadastrar novo parâmetro',
    description:
      'Permite adicionar um novo parâmetro, informando seu código, nome e unidade de medida (ex: temperatura, umidade, pressão, etc).',
  })
  create(@Body() dto: CreateParameterDto) {
    return this.parameterService.create(dto);
  }

  /**
   * Lista ou busca parâmetros cadastrados.
   * A busca segue a seguinte prioridade:
   * 1- `id`  
   * 2- `code`  
   * 3- `name`  
   * 4- `unit`
   */
  @Get()
  @ApiOperation({
    summary: 'Consultar parâmetros',
    description:
      'Retorna os parâmetros cadastrados. A pesquisa segue uma ordem de prioridade: primeiro por `id`, depois por `code`, depois por `name`, e por fim por `unit`.',
  })
  @ApiQuery({ name: 'id', required: false, description: 'Filtrar pelo ID do parâmetro' })
  @ApiQuery({ name: 'code', required: false, description: 'Filtrar pelo código do parâmetro (ex: t_2m)' })
  @ApiQuery({ name: 'name', required: false, description: 'Filtrar pelo nome do parâmetro (ex: Temperatura)' })
  @ApiQuery({ name: 'unit', required: false, description: 'Filtrar pela unidade de medida (ex: °C, mm, m/s)' })
  find(
    @Query('id') id?: string,
    @Query('name') name?: string,
    @Query('code') code?: string,
    @Query('unit') unit?: string,
  ) {
    return this.parameterService.find({ id, name, code, unit });
  }
}