import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FetchMeasurementsDto } from './dto/fetch-measurements.dto';
import { findValidParameters, randomParameter } from './utils/parameter.utils';
import { fetchMeteomaticsData } from './utils/meteomatics.utils';
import { findOrCreateLocations, randomLocal } from './utils/local.utils';
import { processAndSaveMeasurements, scheduleMeasurement, randomMeasurements } from './utils/measurement.utils';
import { Param } from 'generated/prisma/runtime/library';

@Injectable()
export class MeasurementPostService {
  constructor(private prisma: PrismaService) {}

  async getAndPost(dto: FetchMeasurementsDto) {
  const username = process.env.METEOMATICS_USER;
  const password = process.env.METEOMATICS_PASS;

  if (!username || !password) throw new Error('Prtecisa das credenciais');

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

  async random() {
  const username = process.env.METEOMATICS_USER;
  const password = process.env.METEOMATICS_PASS;

  if (!username || !password) throw new Error('Prtecisa das credenciais');

  const date = new Date().toISOString().split('.')[0] + 'Z';

  const param = await randomParameter();
  const local = await randomLocal();

  const meteomaticsData = await fetchMeteomaticsData(username, password, date, param.id, local.id);

  const savedMeasurements = await randomMeasurements(this.prisma, meteomaticsData.data, param.id, local.id, date);

    return {
      status: 'ok',
      response: savedMeasurements
    };
  }

  async schedulePost(scheduleId: string, dto: FetchMeasurementsDto) {
  const username = process.env.METEOMATICS_USER;
  const password = process.env.METEOMATICS_PASS;
  if (!username || !password) throw new Error('Precisa das credenciais');

  const date = dto.date ?? new Date().toISOString().split('.')[0] + 'Z';

  const { parameters, invalidParameters } = await findValidParameters(this.prisma, dto.parameters);
  if (parameters.length === 0) return { status: 'error', message: 'Nenhum parâmetro válido encontrado.', invalidParameters };

  const locations = await findOrCreateLocations(this.prisma, dto.locations);

  const paramCodes = parameters.map(p => p.code).join(',');
  const coordString = locations.map(l => `${l.lat},${l.lon}`).join('+');

  const meteomaticsData = await fetchMeteomaticsData(username, password, date, paramCodes, coordString);

  const savedMeasurements = await scheduleMeasurement(this.prisma, meteomaticsData.data, parameters, locations, scheduleId);

    return {
      status: 'ok',
      savedCount: savedMeasurements.length,
      response: savedMeasurements,
      invalidParameters,
    };
  }
}
