import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LocalService } from '../services/local.service';
import { CreateLocalDto } from '../tools/dto/create-local.dto';

/**
 * Controlador responsável pelas localidades registradas no sistema.
 * Cada local possui um identificador (id), nome, latitude (lat) e longitude (lon).
 */
@ApiTags('Localidades')
@Controller('local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  /**
   * Cria um novo ponto de localização para acesso rápido em medições e alertas.
   */
  @Post()
  @ApiOperation({
    summary: 'Cadastrar nova localidade',
    description:
      'Permite adicionar um novo ponto geográfico, informando nome, latitude e longitude.',
  })
  create(@Body() dto: CreateLocalDto) {
    return this.localService.create(dto);
  }

  /**
   * Lista as localidades cadastradas, podendo aplicar filtros de busca.
   * É possível filtrar por id, nome, ou coordenadas (lat/lon).
   */
  @Get()
  @ApiOperation({
    summary: 'Consultar localidades',
    description:
      'Retorna todas as localidades cadastradas. Pode-se aplicar filtros, como `id`, `name`, `lat` e `lon`.',
  })
  @ApiQuery({ name: 'id', required: false, description: 'Filtrar por ID da localidade' })
  @ApiQuery({ name: 'name', required: false, description: 'Filtrar por nome da cidade ou região' })
  @ApiQuery({ name: 'lat', required: false, description: 'Filtrar pela latitude exata' })
  @ApiQuery({ name: 'lon', required: false, description: 'Filtrar pela longitude exata' })
  async find(
    @Query('id') id?: string,
    @Query('lat') lat?: string,
    @Query('lon') lon?: string,
    @Query('name') name?: string,
  ) {
    return this.localService.find({ id, lat, lon, name });
  }
}
