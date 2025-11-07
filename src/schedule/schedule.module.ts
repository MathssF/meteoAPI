import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { MeasurementModule } from '../../sr/modulos/ponta/measurement.module'; 

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  imports: [
    NestScheduleModule.forRoot(),
    MeasurementModule,
  ],
})
export class ScheduleModule {}
