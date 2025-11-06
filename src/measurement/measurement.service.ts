import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import { FetchMeasurementsDto } from './dto/fetch-measurements.dto';

@Injectable()
export class MeasurementService {
  constructor(private prisma: PrismaService) {}

  async fetchFromMeteomatics(dto: FetchMeasurementsDto) {
    const username = process.env.METEOMATICS_USER;
    const password = process.env.METEOMATICS_PASS;

    if (!username || !password) {
      throw new Error('❌ Variáveis de ambiente METEOMATICS_USER ou METEOMATICS_PASS não definidas!');
    }

    const date = dto.date ?? new Date().toISOString().split('.')[0] + 'Z';

    const parameters = await Promise.all(
      dto.parameters.map(async (p) => {
        if (p.id) {
          return await this.prisma.parameter.findUnique({ where: { id: p.id } });
        } else {
          return await this.prisma.parameter.upsert({
            where: { code: p.code },
            update: {},
            create: {
              code: p.code,
              name: p.name ?? p.code,
              unit: p.unit ?? '',
            },
          });
        }
      })
    );

    const locations = await Promise.all(
      dto.locations.map(async (l) => {
        if (l.id) {
          return await this.prisma.local.findUnique({ where: { id: l.id } });
        } else {
          return await this.prisma.local.upsert({
            where: {
              // evita duplicar o mesmo ponto geográfico
              name_lat_lon: { name: l.name ?? '', lat: l.lat ?? 0, lon: l.lon ?? 0 },
            },
            update: {},
            create: {
              name: l.name ?? 'Local sem nome',
              lat: l.lat ?? 0,
              lon: l.lon ?? 0,
            },
          });
        }
      })
    );


    const paramCodes = parameters.map(p => p.code).join(',');
    const coordString = locations.map(l => `${l.lat},${l.lon}`).join('+');

    const url = `https://api.meteomatics.com/${date}/${paramCodes}/${coordString}/json`;

    const response = await axios.get(url, {
      auth: { username, password }
    });

    // Criar batch
    const batch = await this.prisma.forecastBatch.create({
      data: { source: 'meteomatics' }
    });

    // Processar e salvar medições
    for (const p of response.data.data) {
      const parameter = await this.prisma.parameter.findFirst({ where: { code: p.parameter.split(':')[0] } });

      for (const c of p.coordinates) {
        const local = await this.prisma.local.findFirst({
          where: { lat: c.lat, lon: c.lon }
        });

        for (const d of c.dates) {
          await this.prisma.measurement.create({
            data: {
              localId: local.id,
              parameterId: parameter.id,
              timestamp: new Date(d.date),
              value: d.value,
              batchId: batch.id
            }
          });
        }
      }
    }

    return { status: 'ok', batchId: batch.id };
  }
}
