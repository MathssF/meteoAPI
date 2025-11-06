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

    const date = dto.date ?? new Date().toISOString().split('.')[0] + 'Z';

    const params = dto.parameters.join(',');
    const coords = dto.locations.map(l => `${l.lat},${l.lon}`).join('+');
    const url = `https://api.meteomatics.com/${date}/${params}/${coords}/json`;

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
