import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedLocals() {
  const locals = [
    {
      name: 'Vitória da Conquista',
      lat: -14.8615,
      lon: -40.8445,
    },
    {
      name: 'Florianópolis',
      lat: -27.5954,
      lon: -48.5480,
    },
  ];

  for (const local of locals) {
    let existing = await prisma.local.findFirst({ where: { name: local.name } });
    if (!existing) {
      await prisma.local.create({ data: local });
    }
  }

  console.log('✅ Locais inseridos com sucesso!');
}

const list = [
  {
    name: 'Vitória da Conquista',
    lat: -14.8461,
    lon: -40.8413,
  },
  {
    name: 'Florianópolis',
    lat: -27.5954,
    lon: -48.5480,
  },
  {
    name: 'Salvador',
    lat: -12.9714,
    lon: -38.5014,
  },
  {
    name: 'São José',
    lat: -27.6136,
    lon: -48.6518,
  },
  {
    name: 'Palhoça',
    lat: -27.6296,
    lon: -48.6679,
  },
  {
    name: 'Blumenau',
    lat: -26.9226,
    lon: -49.0661,
  },
  {
    name: 'Balneário Camboriú',
    lat: -26.9928,
    lon: -48.6336,
  },
  {
    name: 'São Paulo',
    lat: -23.5505,
    lon: -46.6333,
  },
  {
    name: 'Rio de Janeiro',
    lat: -22.9068,
    lon: -43.1729,
  },
  {
    name: 'Belo Horizonte',
    lat: -19.9167,
    lon: -43.9345,
  },
];