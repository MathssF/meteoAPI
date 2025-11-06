import { seedLocals } from './local.seed';
import { seedParameters } from './para.seed';
import { seedAlerts } from './alert.seed';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function mainSeed() {
  console.log('🌱 Iniciando seeds...');
  await seedLocals();
  await seedParameters();
  await seedAlerts();
  console.log('✅ Todas as seeds foram executadas com sucesso!');
}

mainSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
