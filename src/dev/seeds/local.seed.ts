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
