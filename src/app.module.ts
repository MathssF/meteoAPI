import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './main/dev.module';
import { LocalModule } from './local/local.module';
import { ParameterModule } from './parameter/parameter.module';
import { MeasurementModule } from './measurement/measurement.module';
import { AlertModule } from './alert/alert.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [MainModule, LocalModule, ParameterModule, MeasurementModule, AlertModule, PrismaModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
