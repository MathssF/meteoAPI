import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { CreateParameterDto } from './dto/create-parameter.dto';

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
}
