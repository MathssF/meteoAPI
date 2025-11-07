import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/data/prisma/prisma.service';
import { FetchMeasurementsDto } from '../tools/dto/fetch-measurements.dto';
import { findValidParameters } from '../tools/utils/measurement-utils/parameter.utils';
import { fetchMeteomaticsData } from '../tools/utils/measurement-utils/meteomatics.utils';
import { findOrCreateLocations } from '../tools/utils/measurement-utils/local.utils';
import { processAndSaveMeasurements } from '../tools/utils/measurement-utils/measurement.utils';
import { checkAlerts } from '../tools/utils/measurement-utils/alerts.utils';

@Injectable()
export class MeasurementPostService {
  constructor(private prisma: PrismaService) {}

  async executeFetch(dto: FetchMeasurementsDto, scheduleId?: string) {
    const username = process.env.METEOMATICS_USER;
    const password = process.env.METEOMATICS_PASS;
    if (!username || !password)
      throw new Error('Precisa das credenciais do Meteomatics');

    const date = dto.date ?? new Date().toISOString().split('.')[0] + 'Z';

    const { parameters, invalidParameters } = await findValidParameters(
      this.prisma,
      dto.parameters,
    );
    console.log('Parametros', parameters, invalidParameters);
    if (parameters.length === 0)
      return {
        status: 'error',
        message: 'Nenhum parâmetro válido encontrado.',
        invalidParameters,
      };

    const locations = await findOrCreateLocations(this.prisma, dto.locations);
    const paramCodes = parameters.map((p) => p.code).join(',');
    const coordString = locations.map((l) => `${l.lat},${l.lon}`).join('+');

    const meteomaticsData = await fetchMeteomaticsData(
      username,
      password,
      date,
      paramCodes,
      coordString,
    );

    let batchId: string | null = null;
    if (!scheduleId) {
      const batch = await this.prisma.forecastBatch.create({
        data: { source: 'meteomatics' },
      });
      batchId = batch.id;
    }

    const savedMeasurements = await processAndSaveMeasurements(
      this.prisma,
      meteomaticsData.data,
      parameters,
      locations,
      { batchId, scheduleId },
    );

    let matchAlerts: any[] = [];
    if (!scheduleId) {
      for (const elem of savedMeasurements) {
        const check = await checkAlerts(
          this.prisma,
          elem.localId,
          elem.parameterId,
          elem.value,
          elem.id,
        );
        if (check) matchAlerts.push(check);
      }
    }

    return {
      status: 'ok',
      savedCount: savedMeasurements.length,
      response: savedMeasurements,
      invalidParameters,
      ...(batchId ? { batchId } : {}),
      ...(matchAlerts.length ? { matchAlerts } : {}),
    };
  }
}
