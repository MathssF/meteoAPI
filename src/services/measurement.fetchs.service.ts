import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class MeasurementFetchService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.measurement.findMany({
      include: { local: true, parameter: true, batch: true, schedule: true },
    });
  }

  async findById(id: string) {
    return this.prisma.measurement.findUnique({
      where: { id },
      include: { local: true, parameter: true, batch: true, schedule: true },
    });
  }

  async findByBatch(batchId: string) {
    return this.prisma.measurement.findMany({
      where: { batchId },
      include: { local: true, parameter: true },
    });
  }

  async findBySchedule(scheduleId: string) {
    return this.prisma.measurement.findMany({
      where: { scheduleId },
      include: { local: true, parameter: true },
    });
  }
}
