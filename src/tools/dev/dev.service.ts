import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/data/prisma/prisma.service';
import { mainSeed } from '../../core/data/seeds/main.seed';

@Injectable()
export class DevService {
  constructor(private prisma: PrismaService) {}

  // ---- START ----
  async start() {
    await this.prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);

    const tables = await this.prisma.$queryRaw<
      Array<{ TABLE_NAME: string }>
    >`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'meteo_db'`;

    for (const t of tables) {
      await this.prisma.$executeRawUnsafe(`TRUNCATE TABLE ${t.TABLE_NAME}`);
    }

    await this.prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);
    await mainSeed(this.prisma);

    return { message: 'Banco resetado com sucesso!' };
  }

}
