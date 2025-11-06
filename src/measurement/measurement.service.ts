import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import { FetchMeasurementsDto } from './dto/fetch-measurements.dto';
import { Parameter, Local, Measurement } from './interfaces/measurements.interface'

@Injectable()
export class MeasurementService {
  constructor(private prisma: PrismaService) {}

  async fetchFromMeteomatics(dto: FetchMeasurementsDto) {
    const username = process.env.METEOMATICS_USER;
    const password = process.env.METEOMATICS_PASS;

    if (!username || !password) {
      throw new Error('❌ Variáveis METEOMATICS_USER ou METEOMATICS_PASS não definidas.');
    }

    const date = dto.date ?? new Date().toISOString().split('.')[0] + 'Z';

    // 🔹 Buscar PARÂMETROS
    const parameters: Parameter[] = [];
    const invalidParameters: typeof dto.parameters = [];

    for (const p of dto.parameters) {
      let param: Parameter | null = null;

      if (p.id) {
        param = await this.prisma.parameter.findUnique({ where: { id: p.id } });
      } else if (p.code) {
        param = await this.prisma.parameter.findUnique({ where: { code: p.code } });
      } else if (p.name) {
        param = await this.prisma.parameter.findFirst({ where: { name: p.name } });
      }

      if (!param) {
        invalidParameters.push(p);
      } else {
        parameters.push(param);
      }
    }

    if (parameters.length === 0) {
      return {
        status: 'error',
        message: 'Nenhum parâmetro válido encontrado.',
        invalidParameters,
      };
    }

    // 🔹 Buscar LOCAIS
    const locations: Local[] = [];
    for (const l of dto.locations) {
      if (l.id) {
        const found = await this.prisma.local.findUnique({ where: { id: l.id } });
        if (found) locations.push(found);
        continue;
      }

      if (l.lat == null || l.lon == null) {
        throw new Error('❌ Para criar um local, é necessário informar lat e lon.');
      }

      let existing = await this.prisma.local.findFirst({
        where: { lat: l.lat, lon: l.lon },
      });

      if (!existing) {
        existing = await this.prisma.local.create({
          data: {
            name: l.name ?? 'Local sem nome',
            lat: l.lat,
            lon: l.lon,
          },
        });
      }

      locations.push(existing);
    }

    const paramCodes = parameters.map((p) => p.code).join(',');
    const coordString = locations.map((l) => `${l.lat},${l.lon}`).join('+');
    const url = `https://api.meteomatics.com/${date}/${paramCodes}/${coordString}/json`;

    const response = await axios.get(url, { auth: { username, password } });

    // 🔹 Criar Batch
    const batch = await this.prisma.forecastBatch.create({
      data: { source: 'meteomatics' },
    });

    // 🔹 Processar medições
    const savedMeasurements: Measurement[] = [];

    for (const p of response.data.data) {
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
