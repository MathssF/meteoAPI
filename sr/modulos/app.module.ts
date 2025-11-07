import { Module } from '@nestjs/common';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';
import { DevModule } from '../tools/dev/dev.module';
import { LocalModule } from '../../src/local/local.module';
import { ParameterModule } from '../../src/parameter/parameter.module';
import { MeasurementModule } from '../../src/measurement/measurement.module';
import { AlertModule } from './basicos/alert.module';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { ScheduleModule } from '../../src/schedule/schedule.module';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from '../../src/schedule/schedule.service';

@Module({
  imports: [
    LocalModule, ParameterModule,
    MeasurementModule, AlertModule, 
    ScheduleModule,
    NestScheduleModule.forRoot(),
    PrismaModule,
    DevModule,
  ],
  controllers: [AppController],
  providers: [AppService, ScheduleService],
})
export class AppModule {}
