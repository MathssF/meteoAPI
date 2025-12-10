import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/data/prisma/prisma.service';
import { mainSeed } from '../../core/data/seeds/main.seed';

@Injectable()
export class DevService {
  constructor(private prisma: PrismaService) {}

  // ---- START ----
  async start() {
    await mainSeed(this.prisma);
    console.log('Seeds processadas')
  }
}
