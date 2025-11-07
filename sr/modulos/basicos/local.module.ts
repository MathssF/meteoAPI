import { Module } from '@nestjs/common';
import { LocalService } from '../../services/local.service';
import { LocalController } from '../../controllers/local.controller';

@Module({
  controllers: [LocalController],
  providers: [LocalService],
})
export class LocalModule {}
