import { Controller, Get, Post, Body, Query } from '@nestjs/common';
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
  find(
    @Query('id') id?: string,
    @Query('name') name?: string,
    @Query('code') code?: string,
    @Query('unit') unit?: string,
  ) {
    return this.parameterService.find({ id, name, code, unit });
  }
}