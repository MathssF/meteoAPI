import { Module } from '@nestjs/common';
import { MainService } from './dev.service';
import { MainController } from './dev.controller';

@Module({
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
