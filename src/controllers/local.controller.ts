import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { LocalService } from '../services/local.service';
import { CreateLocalDto } from '../tools/dto/create-local.dto';

@Controller('local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post()
  create(@Body() dto: CreateLocalDto) {
    return this.localService.create(dto);
  }

  @Get()
  async find(
    @Query('id') id?: string,
    @Query('lat') lat?: string,
    @Query('lon') lon?: string,
    @Query('name') name?: string,
  ) {
    return this.localService.find({ id, lat, lon, name });
  }
}