import { Controller, Post } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Post('seed')
  async seed() {
    await this.mainService.seed();
    return { message: '🌱 Seeds executadas com sucesso!' };
  }
}
