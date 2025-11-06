import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedParameters() {
  const parameters = [
    { code: 't_2m:C', name: 'Temperatura do ar a 2m', unit: '°C' },
    { code: 't_max_2m_24h:C', name: 'Temperatura máxima em 24h', unit: '°C' },
    { code: 't_min_2m_24h:C', name: 'Temperatura mínima em 24h', unit: '°C' },
    { code: 'precip_1h:mm', name: 'Precipitação 1h', unit: 'mm' },
    { code: 'precip_24h:mm', name: 'Precipitação 24h', unit: 'mm' },
    { code: 'wind_speed_10m:ms', name: 'Velocidade do vento a 10m', unit: 'm/s' },
    { code: 'wind_dir_10m:d', name: 'Direção do vento a 10m', unit: '°' },
    { code: 'mslp:hPa', name: 'Pressão ao nível do mar', unit: 'hPa' },
    { code: 'rel_hum_2m:p', name: 'Umidade relativa do ar a 2m', unit: '%' },
    { code: 'sunshine_dur_1h:min', name: 'Duração da insolação 1h', unit: 'min' },
    { code: 'global_rad:W', name: 'Radiação global', unit: 'W/m²' },
    { code: 'dew_point_2m:C', name: 'Ponto de orvalho a 2m', unit: '°C' },
    { code: 'snow_depth:cm', name: 'Profundidade de neve', unit: 'cm' },
    { code: 'visibility:m', name: 'Visibilidade horizontal', unit: 'm' },
  ];

  for (const p of parameters) {
    let existing = await prisma.parameter.findFirst({ where: { code: p.code}});
    if (!existing) {
      await prisma.parameter.create({ data: p })
    }
    /*
    await prisma.parameter.upsert({
      where: { code: p.code },
      update: {},
      create: p,
    });
    */
  }

  console.log('✅ Parâmetros inseridos com sucesso!');
}
