import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { MeasurementService } from '../measurement/measurement.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    private prisma: PrismaService,
    private measurementService: MeasurementService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleSchedules() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
    const currentDay = now.toLocaleString('en-US', { weekday: 'short' }).toLowerCase(); // "mon", "tue", etc.
    const currentDate = now.getDate().toString(); // "10", "20", ...

    const schedules = await this.prisma.schedule.findMany({
      where: { active: true, time: currentTime },
      include: { local: true, parameter: true },
    });

    for (const s of schedules) {
      if (this.shouldRun(s.when, currentDay, currentDate)) {
        this.logger.log(`⏰ Executando Schedule ${s.id} para ${s.local.name} (${s.parameter.code})`);

        await this.measurementService.fetchFromMeteomatics({
          parameters: [s.parameter.code],
          locations: [{ lat: s.local.lat, lon: s.local.lon, name: s.local.name }],
        });

      }
    }
  }

  private shouldRun(when: string, currentDay: string, currentDate: string): boolean {
    const items = when.split(',').map(w => w.trim().toLowerCase());
    // Exemplo: "sun,mon,wed" → roda se o dia atual está na lista
    // Ou "10,20,30" → roda se a data atual está na lista
    return items.includes(currentDay) || items.includes(currentDate);
  }
}
