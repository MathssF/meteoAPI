// main.seed.ts
import { seedLocals } from './local.seed';
import { seedParameters } from './para.seed';
import { seedAlerts } from './alert.seed';
import { PrismaClient } from '@prisma/client';

export async function mainSeed(prisma: PrismaClient) {
  console.log('🌱 Iniciando seeds...');
  await seedLocals();
  await seedParameters();
  await seedAlerts();
  console.log('✅ Todas as seeds foram executadas com sucesso!');
}
