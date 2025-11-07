import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ParameterService } from '../services/parameter.service';
import { CreateParameterDto } from '../tools/dto/create-parameter.dto';

@Controller('parameter')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}

  @Post()
  create(@Body() dto: CreateParameterDto) {
    return this.parameterService.create(dto);
  }

  @Get()
  findAll() {
    return this.parameterService.findAll();
  }

  // GET /parameter/:id
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.parameterService.findById(id);
  }

  // GET /parameter/search/by-name?name=[String]
  // GET /parameter/search/by-name?name=temp (exemplo)
  @Get('search/by-name')
  findByName(@Query('name') name: string) {
    return this.parameterService.findByName(name);
  }

  // GET /parameter/search/by-code?code=[String]
  // GET /parameter/search/by-code?code=t_2m (exemplo)
  @Get('search/by-code')
  findByCode(@Query('code') code: string) {
    return this.parameterService.findByCode(code);
  }

  // GET /parameter/search/by-unit?unit=[String]
  // GET /parameter/search/by-unit?unit=C (exemplo)
  @Get('search/by-unit')
  findByUnit(@Query('unit') unit: string) {
    return this.parameterService.findByUnit(unit);
  }
}
