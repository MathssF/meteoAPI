import { Test, TestingModule } from '@nestjs/testing';
import { mockLocals, mockParameters } from './measurement.mocks';
import { mockAlerts } from './alert.mocks';
import { mockSchedules } from './schedule.mocks';
import { MeasurementFetchService } from 'src/services/measurement.fetchs.service';
import { MeasurementPostService } from 'src/services/measurement.post.service';
import { MeasurementRandomService } from 'src/services/measurement.random.service';
import { MeasurementController } from 'src/controllers/measurement.controller';
import { ScheduleService } from 'src/services/schedule.service';
import { ScheduleController } from 'src/controllers/schedule.controller';
import { AlertService } from 'src/services/alert.service';
import { AlertController } from 'src/controllers/alert.controller';

describe('', () => {
  
})