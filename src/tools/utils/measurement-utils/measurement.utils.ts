import { PrismaService } from '../../../core/data/prisma/prisma.service';
import { Measurement, Local, Parameter } from '../../interfaces/measurements.interface';

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
  refs: { batchId?: string | null; scheduleId?: string | null }
) {
  const savedMeasurements: Measurement[] = [];

  for (const p of data) {
    const parameter = parameters.find((param) => param.code === p.parameter);
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
            batchId: refs.batchId ?? null,
            scheduleId: refs.scheduleId ?? null,
          },
        });
        savedMeasurements.push(measurement);
      }
    }
  }

  return savedMeasurements;
}