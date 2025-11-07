import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/data/prisma/prisma.service';
import axios from 'axios';
import { checkAlerts } from '../tools/utils/measurement-utils/alerts.utils';

@Injectable()
export class MeasurementRandomService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(localId: string, parameterId: string, date?: string) {
    const username = process.env.METEOMATICS_USER;
    const password = process.env.METEOMATICS_PASS;
    if (!username || !password)
      throw new Error('Credenciais Meteomatics ausentes');

    const local = await this.prisma.local.findUnique({ where: { id: localId } });
    if (!local) throw new Error(`Local ${localId} não encontrado.`);

    const parameter = await this.prisma.parameter.findUnique({
      where: { id: parameterId },
    });
    if (!parameter)
      throw new Error(`Parâmetro ${parameterId} não encontrado.`);

    const dateToUse = date ?? new Date().toISOString().split('.')[0] + 'Z';
    const paramCodes = parameter.code;
    const coordString = `${local.lat},${local.lon}`;

    console.log('meteomatics utils, coord:', coordString);

    const url = `https://api.meteomatics.com/${dateToUse}/${paramCodes}/${coordString}/json`;
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
        timestamp: new Date(),
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

  async getRandomIds(localCount: number, parameterCount: number) {
    const maxLocalCount = Math.min(localCount, 3);
    const maxParamCount = Math.min(parameterCount, 3);

    const allLocals = await this.prisma.local.findMany({ select: { id: true } });
    const allParams = await this.prisma.parameter.findMany({ select: { id: true } });

    if (allLocals.length === 0 || allParams.length === 0)
      throw new Error('Não há locais ou parâmetros cadastrados.');

    const randomLocals = this.pickRandomItems(allLocals.map(l => l.id), maxLocalCount);
    const randomParams = this.pickRandomItems(allParams.map(p => p.id), maxParamCount);

    return { randomLocals, randomParams };
  }

  async executeRandomBatch(localCount: number, parameterCount: number, date?: string) {
    const { randomLocals, randomParams } = await this.getRandomIds(localCount, parameterCount);

    const results: any[] = [];

    for (const localId of randomLocals) {
      for (const parameterId of randomParams) {
        const measurement = await this.execute(localId as string, parameterId as string, date as string);
        results.push(measurement);
      }
    }

    return results;
  }

  private pickRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
