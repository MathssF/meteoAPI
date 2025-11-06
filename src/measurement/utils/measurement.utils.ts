import { ParameterModule } from 'src/parameter/parameter.module';
import { PrismaService } from '../../prisma/prisma.service';
import { Measurement, Local, Parameter } from '../interfaces/measurements.interface';

interface MeteomaticsData {
  parameter: string;
  coordinates: {
    lat: number;
    lon: number;
    dates: { date: string; value: number }[];
  }[];
}

export async function processAndSaveMeasurements(
  prisma: PrismaService,
  data: MeteomaticsData[],
  parameters: Parameter[],
  locations: Local[],
  batchId: string
) {
  const savedMeasurements: Measurement[] = [];

  for (const p of data) {
    const parameter = parameters.find((param) => param.code === p.parameter.split(':')[0]);
    if (!parameter) continue;

    for (const c of p.coordinates) {
      const local = locations.find((l) => l.lat === c.lat && l.lon === c.lon);
      if (!local) continue;

      for (const d of c.dates) {
        console.log('measuremente uniade: ', d)
        const measurement = await prisma.measurement.create({
          data: {
            localId: local.id,
            parameterId: parameter.id,
            timestamp: new Date(d.date),
            value: d.value,
            batchId,
          },
        });
        savedMeasurements.push(measurement);
      }
    }
  }

  return savedMeasurements;
}

export async function scheduleMeasurement(
  prisma: PrismaService,
  data: MeteomaticsData[],
  parameters: Parameter[],
  locations: Local[],
  scheduleId: string
) {
  const savedMeasurements: Measurement[] = [];

  for (const p of data) {
    const parameter = parameters.find((param) => param.code === p.parameter.split(':')[0]);
    if (!parameter) continue;

    for (const c of p.coordinates) {
      const local = locations.find((l) => l.lat === c.lat && l.lon === c.lon);
      if (!local) continue;

      for (const d of c.dates) {
        const measurement = await prisma.measurement.create({
          data: {
            localId: local.id,
            parameterId: parameter.id,
            timestamp: new Date(d.date),
            value: d.value,
            scheduleId
          },
        });
        savedMeasurements.push(measurement);
      }
    }
  }

  return savedMeasurements;
}