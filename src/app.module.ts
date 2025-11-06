import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevModule } from './dev/dev.module';
import { LocalModule } from './local/local.module';
import { ParameterModule } from './parameter/parameter.module';
import { MeasurementModule } from './measurement/measurement.module';
import { AlertModule } from './alert/alert.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule/schedule.service';

@Module({
  imports: [
    DevModule, LocalModule, ParameterModule,
    MeasurementModule, AlertModule, PrismaModule,
    ScheduleModule, NestScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, ScheduleService],
})
export class AppModule {}
