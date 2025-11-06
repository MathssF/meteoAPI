import { Controller, Post, Get, Body } from '@nestjs/common';
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
}
