import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FetchMeasurementsDto } from './dto/fetch-measurements.dto';
import { findValidParameters } from './utils/parameter.utils';
import { fetchMeteomaticsData } from './utils/meteomatics.utils';
import { findOrCreateLocations,  } from './utils/local.utils';
import { processAndSaveMeasurements, scheduleMeasurement } from './utils/measurement.utils';
import { checkAlerts } from './utils/alerts.utils';

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

    let matchAlerts: any[] = []; // CheckAlertResult[][]

    savedMeasurements.forEach(async (elem) => {
      let checkAtual = await checkAlerts(this.prisma, elem.localId, elem.parameterId, elem.value);
      if (checkAtual) matchAlerts.push(checkAtual);
    })

    return {
      status: 'ok',
      batchId: batch.id,
      savedCount: savedMeasurements.length,
      response: savedMeasurements,
      invalidParameters,
      matchAlerts,
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
