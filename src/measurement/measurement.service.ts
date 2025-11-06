import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FetchMeasurementsDto } from './dto/fetch-measurements.dto';
import { Measurement } from './interfaces/measurements.interface'
import { findValidParameters } from './utils/parameter.utils';
import { fetchMeteomaticsData } from './utils/meteomatics.utils';
import { findOrCreateLocations } from './utils/local.utils';

@Injectable()
export class MeasurementService {
  constructor(private prisma: PrismaService) {}

  async fetchFromMeteomatics(dto: FetchMeasurementsDto) {
  const username = process.env.METEOMATICS_USER;
  const password = process.env.METEOMATICS_PASS;
  if (!username || !password) throw new Error('❌ Variáveis METEOMATICS_USER ou METEOMATICS_PASS não definidas.');

  const date = dto.date ?? new Date().toISOString().split('.')[0] + 'Z';

  const { parameters, invalidParameters } = await findValidParameters(this.prisma, dto.parameters);
  if (parameters.length === 0) return { status: 'error', message: 'Nenhum parâmetro válido encontrado.', invalidParameters };

  const locations = await findOrCreateLocations(this.prisma, dto.locations);

  const paramCodes = parameters.map(p => p.code).join(',');
  const coordString = locations.map(l => `${l.lat},${l.lon}`).join('+');

  const meteomaticsData = await fetchMeteomaticsData(username, password, date, paramCodes, coordString);

  const batch = await this.prisma.forecastBatch.create({ data: { source: 'meteomatics' } });

    // 🔹 Processar medições
    const savedMeasurements: Measurement[] = [];

    for (const p of meteomaticsData.data) {
      const parameter = await this.prisma.parameter.findFirst({
        where: { code: p.parameter.split(':')[0] },
      });

      if (!parameter) continue;

      for (const c of p.coordinates) {
        const local = await this.prisma.local.findFirst({
          where: { lat: c.lat, lon: c.lon },
        });

        if (!local) continue;

        for (const d of c.dates) {
          const measurement = await this.prisma.measurement.create({
            data: {
              localId: local.id,
              parameterId: parameter.id,
              timestamp: new Date(d.date),
              value: d.value,
              batchId: batch.id,
            },
          });
          savedMeasurements.push(measurement);
        }
      }
    }

    return {
      status: 'ok',
      batchId: batch.id,
      savedCount: savedMeasurements.length,
      invalidParameters,
    };
  }

  // -------- Fetchs --------

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
