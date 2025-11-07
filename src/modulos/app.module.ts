import { Module } from '@nestjs/common';
import { MeasurementModule } from './ponta/measurement.module';
import { PrismaModule } from '../core/data/prisma/prisma.module';
import { ScheduleModule } from './ponta/schedule.module';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from '../services/schedule.service';
import { BasicModule } from './basic.module';
import { DevModule } from 'src/tools/dev/dev.module';

@Module({
  imports: [
    BasicModule,
    MeasurementModule,
    ScheduleModule,
    NestScheduleModule.forRoot(),
    PrismaModule,
    DevModule, // Temporário
  ],
  controllers: [],
  providers: [ScheduleService],
})
export class AppModule {}