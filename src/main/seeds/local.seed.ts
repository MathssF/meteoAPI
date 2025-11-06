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
    await prisma.local.upsert({
      where: { name: local.name },
      update: {},
      create: local,
    });
  }

  console.log('✅ Locais inseridos com sucesso!');
}
