import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../core/data/prisma/prisma.service';
import { MeasurementPostService } from './measurement.post.service';
import { CreateScheduleDto } from '../tools/dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    private prisma: PrismaService,
    private measurementService: MeasurementPostService,
  ) {}

  // CRUD

  async create(data: CreateScheduleDto) {
    return this.prisma.schedule.create({ data });
  }

  async findAll() {
    return this.prisma.schedule.findMany({
      include: { local: true, parameter: true },
    });
  }

  async findById(id: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: { local: true, parameter: true },
    });
    if (!schedule) throw new NotFoundException(`Schedule ${id} não encontrado`);
    return schedule;
  }

  async findByLocalId(localId: string) {
    return this.prisma.schedule.findMany({
      where: { localId },
      include: { local: true, parameter: true },
    });
  }

  async activateById(id: string) {
    const schedule = await this.prisma.schedule.update({
      where: { id },
      data: { active: true },
    });
    this.logger.log(`Schedule ${id} ativado`);
    return schedule;
  }

  async deactivateById(id: string) {
    const schedule = await this.prisma.schedule.update({
      where: { id },
      data: { active: false },
    });
    this.logger.log(`Schedule ${id} desativado`);
    return schedule;
  }

  // CRON JOB (a cada 5 minutos)

  @Cron('*/5 * * * *')
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
        this.logger.log(`Schedule: ${s.id} para ${s.local.name} (${s.parameter.code})`);

        await this.measurementService.schedulePost(s.id, {
          parameters: [{ id: s.parameter.id }],
          locations: [{ id: s.local.id }],
        });
      }
    }
  }

  private shouldRun(when: string, currentDay: string, currentDate: string): boolean {
    const items = when.split(',').map(w => w.trim().toLowerCase());
    return items.includes(currentDay) || items.includes(currentDate);
  }
}
