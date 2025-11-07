import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DevModule } from '../tools/dev/dev.module';
import { MeasurementModule } from './ponta/measurement.module';
import { PrismaModule } from '../core/data/prisma/prisma.module';
import { ScheduleModule } from './ponta/schedule.module';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from '../services/schedule.service';
import { BasicModule } from './basic.module';

@Module({
  imports: [
    BasicModule,
    MeasurementModule,
    ScheduleModule,
    NestScheduleModule.forRoot(),
    PrismaModule,
    DevModule,
  ],
  controllers: [AppController],
  providers: [AppService, ScheduleService],
})
export class AppModule {}