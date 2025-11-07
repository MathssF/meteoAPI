import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { mainSeed } from '../../data/seeds/main.seed';

@Injectable()
export class DevService {
  constructor(private prisma: PrismaService) {}

  // ---- SEEDS ----
  async seed() {
    await mainSeed(this.prisma);
  }

  // ---- SCHEDULES ----
  async activateAllSchedules() {
    const result = await this.prisma.schedule.updateMany({
      data: { active: true },
    });
    return { message: `✅ ${result.count} schedules ativados.` };
  }

  async deactivateAllSchedules() {
    const result = await this.prisma.schedule.updateMany({
      data: { active: false },
    });
    return { message: `🛑 ${result.count} schedules desativados.` };
  }

  // ---- FORECAST BATCH ----
  async findAllBatches() {
    return this.prisma.forecastBatch.findMany({
      orderBy: { runAt: 'desc' },
      include: { measurements: true },
    });
  }

  async findBatchById(id: string) {
    return this.prisma.forecastBatch.findUnique({
      where: { id },
      include: { measurements: true },
    });
  }

  async findBatchesByDate(date: string) {
    // Exemplo de entrada: "2025-11-05"
    const start = new Date(`${date}T00:00:00Z`);
    const end = new Date(`${date}T23:59:59Z`);

    return this.prisma.forecastBatch.findMany({
      where: {
        runAt: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { runAt: 'desc' },
      include: { measurements: true },
    });
  }

  async check(a: string, i: string, v: boolean) {
    if (a === 'l') {
      const updatedLocal = await this.prisma.local.update({
        where: { id: i },
        data: { check: v },
      }).catch(() => null);
      return updatedLocal;
    } else if(a === "p") {
      const updatedParameter = await this.prisma.parameter.update({
        where: { id: i },
        data: { check: v },
      }).catch(() => null);
      return updatedParameter;
    } else return null;
  }
}
