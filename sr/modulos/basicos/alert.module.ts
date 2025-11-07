import { Module } from '@nestjs/common';
import { AlertService } from '../../services/alert.service';
import { AlertController } from '../../controllers/alert.controller';
import { TriggeredAlertService } from '../../services/triggered-alert.service';
import { TriggeredAlertController } from './triggered-alert.controller';

@Module({
  controllers: [AlertController, TriggeredAlertController],
  providers: [AlertService, TriggeredAlertService],
})
export class AlertModule {}
