import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/data/prisma/prisma.service';

@Injectable()
export class MeasurementFetchService {
  constructor(private prisma: PrismaService) {}

  async find(filters: { id?: string; batchId?: string; scheduleId?: string }) {
    const { id, batchId, scheduleId } = filters;

    if (id) {
      const measurement = await this.prisma.measurement.findUnique({
        where: { id },
        // include: { local: true, parameter: true, batch: true, schedule: true },
      });
      if (!measurement)
        throw new NotFoundException(`Measurement ${id} não encontrada`);
      return measurement;
    }

    const where: any = {};
    if (batchId) where.batchId = batchId;
    if (scheduleId) where.scheduleId = scheduleId;

    return this.prisma.measurement.findMany({
      where,
      // include: { local: true, parameter: true, batch: true, schedule: true },
    });
  }
}