import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/data/prisma/prisma.service';
import { CreateLocalDto } from '../tools/dto/create-local.dto';

@Injectable()
export class LocalService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateLocalDto) {
    return this.prisma.local.create({ data });
  }

  findAll() {
    return this.prisma.local.findMany();
  }

  async findById(id: string) {
    return this.prisma.local.findUnique({ where: { id } });
  }

  async findByLat(lat: number) {
    return this.prisma.local.findMany({ where: { lat } });
  }

  async findByLon(lon: number) {
    return this.prisma.local.findMany({ where: { lon } });
  }

  async findByName(name: string) {
    return this.prisma.local.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async findRandom() {
    const count = await this.prisma.local.count();
    if (count === 0) return null;

    const randomIndex = Math.floor(Math.random() * count);

    const randomLocal = await this.prisma.local.findMany({
      take: 1,
      skip: randomIndex,
    });

    return randomLocal[0] ?? null;
  }
}
