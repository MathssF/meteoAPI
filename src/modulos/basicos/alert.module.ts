import { Module } from '@nestjs/common';
import { AlertService } from '../../services/alert.service';
import { AlertController } from '../../controllers/alert.controller';

@Module({
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}