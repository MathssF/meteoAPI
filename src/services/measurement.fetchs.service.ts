import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../core/data/prisma/prisma.service';

@Injectable()
export class MeasurementFetchService {
  constructor(private prisma: PrismaService) {}

  async find(filters: { id?: string; batchId?: string; scheduleId?: string }) {
    const { id, batchId, scheduleId } = filters;

    const baseInclude = {
      local: { select: { id: true, name: true, lat: true, lon: true } },
      parameter: { select: { id: true, code: true, name: true, unit: true } },
      batch: true,
      schedule: true,
    };

    if (id) {
      const measurement = await this.prisma.measurement.findUnique({
        where: { id },
        include: baseInclude, // { local: true, parameter: true, batch: true, schedule: true }
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
      include: { local: true, parameter: true, batch: true, schedule: true },
    });
  }
}