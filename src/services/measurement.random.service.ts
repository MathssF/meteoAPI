import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/data/prisma/prisma.service';
import axios from 'axios';
import { checkAlerts } from '../tools/utils/measurement-utils/alerts.utils';

@Injectable()
export class MeasurementRandomService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(localId: string, parameterId: string) {
    const username = process.env.METEOMATICS_USER;
    const password = process.env.METEOMATICS_PASS;
    if (!username || !password)
      throw new Error('Credenciais Meteomatics ausentes');

    const local = await this.prisma.local.findUnique({ where: { id: localId } });
    if (!local) throw new Error(`Local ${localId} não encontrado.`);

    const parameter = await this.prisma.parameter.findUnique({
      where: { id: parameterId },
    });
    if (!parameter) throw new Error(`Parâmetro ${parameterId} não encontrado.`);

    const date = new Date().toISOString().split('.')[0] + 'Z';
    const paramCodes = parameter.code;
    const coordString = `${local.lat},${local.lon}`;

    console.log('meteomatics utils, coord:', coordString);

    const url = `https://api.meteomatics.com/${date}/${paramCodes}/${coordString}/json`;
    const response = await axios.get(url, { auth: { username, password } });

    const data = response.data;
    const value =
      data?.data?.[0]?.coordinates?.[0]?.dates?.[0]?.value ?? null;

    if (value === null)
      throw new Error('Nenhum valor retornado pela Meteomatics.');

    const measurement = await this.prisma.measurement.create({
      data: {
        value,
        parameterId,
        localId,
        source: 'meteomatics',
      },
    });

    const alertResults = await checkAlerts(
      this.prisma,
      localId,
      parameterId,
      value,
      measurement.id,
    );

    return {
      status: 'ok',
      measurement,
      alertsTriggered: alertResults.filter((a) => a.triggered),
    };
  }
}
