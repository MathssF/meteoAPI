import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FetchMeasurementsDto } from './dto/fetch-measurements.dto';
import { findValidParameters } from './utils/parameter.utils';
import { fetchMeteomaticsData } from './utils/meteomatics.utils';
import { findOrCreateLocations } from './utils/local.utils';
import { processAndSaveMeasurements } from './utils/measurement.utils';

@Injectable()
export class MeasurementPostService {
  constructor(private prisma: PrismaService) {}

  async getAndPostFromMeteomatics(dto: FetchMeasurementsDto) {
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

  const savedMeasurements = await processAndSaveMeasurements(this.prisma, meteomaticsData.data, parameters, locations, batch.id);

    return {
      status: 'ok',
      batchId: batch.id,
      savedCount: savedMeasurements.length,
      response: savedMeasurements,
      invalidParameters,
    };
  }
}
