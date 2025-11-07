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
  let pCount = 0;
  let lCount = 0;
  let vCount = 0
  for (const p of data) {
    pCount++;
    const parameter = parameters.find((param) => param.code === p.parameter.split(':')[0]);
    if(!parameter) {
      console.log('Não achou parametro em ', pCount);
      continue;
    }

    console.log("Coordenadas dentro de ", pCount, " São: ", p.coordinates);

    for (const c of p.coordinates) {
      lCount ++;
      const local = locations.find((l) => l.lat === c.lat && l.lon === c.lon);
      if (!local) {
        console.log('Não achou local em ', lCount);
        continue;
      }

      console.log('Local encontrado em ', pCount, ':', lCount, ' é o local: ', local);

      for (const d of c.dates) {
        vCount ++;
        const measurement = await prisma.measurement.create({
          data: {
            localId: local.id,
            parameterId: parameter.id,
            timestamp: new Date(d.date),
            value: d.value,
            batchId,
          }
        })
        console.log('Measurement de ', pCount, ':', lCount, ':', vCount, ' é: ', measurement);
      }
      vCount = 0;
    }
    lCount = 0;
  }
  pCount = 0;
  
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
