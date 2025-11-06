import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { mainSeed } from './seeds/main.seed';

@Injectable()
export class MainService {
  constructor(private prisma: PrismaService) {}
  
  async seed() {
    await mainSeed(this.prisma);
  }

}
