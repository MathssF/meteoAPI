import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { LocalService } from './local.service';
import { CreateLocalDto } from './dto/create-local.dto';

@Controller('local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post()
  create(@Body() dto: CreateLocalDto) {
    return this.localService.create(dto);
  }

  @Get()
  findAll() {
    return this.localService.findAll();
  }

  // GET /local/[id] (uuidv7)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.localService.findById(id);
  }

  // GET /local/search/by-lat?lat=[String]
  // GET /local/search/by-lat?lat=-14.861 (exemplo)
  @Get('search/by-lat')
  findByLat(@Query('lat') lat: string) {
    return this.localService.findByLat(parseFloat(lat));
  }

  // GET /local/search/by-lat?lat=[String]
  // GET /local/search/by-lat?lat=-14.861 (exemplo)
  @Get('search/by-lon')
  findByLon(@Query('lon') lon: string) {
    return this.localService.findByLon(parseFloat(lon));
  }

  // GET /local/search/by-name?name=[String] (cidade)
  // GET /local/search/by-name?name=florianopolis (exemplo)
  @Get('search/by-name')
  findByName(@Query('name') name: string) {
    return this.localService.findByName(name);
  }
}
