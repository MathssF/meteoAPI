import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { TriggeredAlertService } from './triggered-alert.service';
import { TriggeredAlertController } from './triggered-alert.controller';

@Module({
  controllers: [AlertController, TriggeredAlertController],
  providers: [AlertService, TriggeredAlertService],
})
export class AlertModule {}
