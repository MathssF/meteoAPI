import { Module } from '@nestjs/common';

import { LocalController } from '../controllers/local.controller';
import { ParameterController } from '../controllers/parameter.controller';
import { AlertController } from '../controllers/alert.controller';

import { LocalService } from '../services/local.service';
import { ParameterService } from '../services/parameter.service';
import { AlertService } from '../services/alert.service';

@Module({
  controllers: [LocalController, ParameterController, AlertController],
  providers: [LocalService, ParameterService, AlertService],
})
export class BasicModule {}