// main.seed.ts
import { seedLocals } from './local.seed';
import { seedParameters } from './para.seed';
import { seedAlerts } from './alert.seed';
import { PrismaClient } from '@prisma/client';

export async function mainSeed(prisma: PrismaClient) {
  console.log('Iniciando seeds. 0/3');
  await seedLocals();
  console.log('1/3')
  await seedParameters();
  console.log('2/3')
  await seedAlerts();
  console.log('3/3')
  console.log('Todas as seeds foram executadas com sucesso!');
}
