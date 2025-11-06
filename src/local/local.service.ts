import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocalDto } from './dto/create-local.dto';

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
        name: { equals: name, mode: 'insensitive' }
        /*
        name: {
          contains: name,
          mode: 'insensitive',
        },
        */
      },
    });
  }
}
