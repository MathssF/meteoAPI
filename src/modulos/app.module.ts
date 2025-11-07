import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DevModule } from '../tools/dev/dev.module';
import { LocalModule } from './basicos/local.module';
import { ParameterModule } from './basicos/parameter.module';
import { MeasurementModule } from './ponta/measurement.module';
import { AlertModule } from './basicos/alert.module';
import { PrismaModule } from './prisma.module';
import { ScheduleModule } from './ponta/schedule.module';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from '../services/schedule.service';

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
