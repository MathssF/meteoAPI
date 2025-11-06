import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedAlerts() {
  const conquista = await prisma.local.findFirst({
    where: { name: 'Vitória da Conquista' },
  });
  const floripa = await prisma.local.findFirst({
    where: { name: 'Florianópolis' },
  });

  const tempParam = await prisma.parameter.findFirst({ where: { code: 't_2m:C' } });
  const precipParam = await prisma.parameter.findFirst({ where: { code: 'precip_1h:mm' } });

  const alerts = [
    // Vitória da Conquista
    {
      localId: conquista.id,
      parameterId: tempParam.id,
      condition: '>',
      threshold: 30,
      active: true,
    },
    {
      localId: conquista.id,
      parameterId: tempParam.id,
      condition: '<',
      threshold: 10,
      active: true,
    },
    {
      localId: conquista.id,
      parameterId: precipParam.id,
      condition: '>',
      threshold: 5,
      active: true,
    },

    // Florianópolis
    {
      localId: floripa.id,
      parameterId: precipParam.id,
      condition: '>',
      threshold: 10,
      active: true,
    },
  ];

  for (const alert of alerts) {
    await prisma.alert.create({ data: alert });
  }

  console.log('✅ Alertas inseridos com sucesso!');
}
