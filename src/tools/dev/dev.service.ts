import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/data/prisma/prisma.service';
import { mainSeed } from '../../core/data/seeds/main.seed';

@Injectable()
export class DevService {
  private startTime = Date.now();
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


  // ---- HEALTH ----
  async checkDatabase() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', latency: 'low' };
    } catch (err) {
      return { status: 'error', message: err.message };
    }
  }

  async checkMeteomatics() {
    const url = "https://api.meteomatics.com/";
    const start = Date.now();
    try {
      const response = await fetch(url, {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              `${process.env.METEOMATICS_USER}:${process.env.METEOMATICS_PASS}`,
            ).toString('base64'),
        },
        signal: AbortSignal.timeout(3500),
      });

      if (!response.ok) {
        return {
          status: 'error',
          message: `HTTP ${response.status} - ${response.statusText}`,
        };
      }

      return {
        status: 'ok',
        latency: `${Date.now() - start}ms`,
      };
    } catch (err: any) {
      return {
        status: 'error',
        message: err.message || 'Erro desconhecido ao acessar a Meteomatics',
      };
    }
  }
  async getHealthStatus() {
    const db = await this.checkDatabase();
    const meteomatics = await this.checkMeteomatics();
    const uptimeSeconds = Math.floor((Date.now() - this.startTime) / 1000);

    return {
      database: db,
      meteomatics: meteomatics,
      uptime: `${uptimeSeconds}s`,
      timestamp: new Date().toISOString(),
    };
  }
}
