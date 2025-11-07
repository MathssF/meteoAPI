import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateParameterDto } from '../tools/dto/create-parameter.dto';

@Injectable()
export class ParameterService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateParameterDto) {
    return this.prisma.parameter.create({ data });
  }

  findAll() {
    return this.prisma.parameter.findMany();
  }

  async findById(id: string) {
    return this.prisma.parameter.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return this.prisma.parameter.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async findByCode(code: string) {
    return this.prisma.parameter.findMany({
      where: {
        code: {
          contains: code,
        },
      },
    });
  }

  async findByUnit(unit: string) {
    return this.prisma.parameter.findMany({
      where: {
        unit: {
          equals: unit,
        },
      },
    });
  }

  async findRandom() {
    const count = await this.prisma.parameter.count();
    if (count === 0) return null;

    const randomIndex = Math.floor(Math.random() * count);

    const randomParameter = await this.prisma.parameter.findMany({
      take: 1,
      skip: randomIndex,
    });

    return randomParameter[0] ?? null;
  }
}
