import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/data/prisma/prisma.service';
import { CreateLocalDto } from '../tools/dto/create-local.dto';

@Injectable()
export class LocalService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateLocalDto) {
    return this.prisma.local.create({ data });
  }

  async find(filters: { id?: string; lat?: string; lon?: string; name?: string }) {
    const { id, lat, lon, name } = filters;

    if (id) {
      return this.prisma.local.findUnique({ where: { id } });
    }

    if (lat && lon) {
      return this.prisma.local.findMany({
        where: {
          lat: parseFloat(lat),
          lon: parseFloat(lon),
        },
      });
    }

    if (name) {
      return this.prisma.local.findMany({
        where: {
          name: {
            contains: name
          },
        },
      });
    }

    return this.prisma.local.findMany();
  }
}