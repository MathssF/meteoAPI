import { Module } from '@nestjs/common';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleController } from '../../controllers/schedule.controller';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { MeasurementModule } from './measurement.module'; 

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  imports: [
    NestScheduleModule.forRoot(),
    MeasurementModule,
  ],
})
export class ScheduleModule {}
