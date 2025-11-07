import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/data/prisma/prisma.service';
import { CreateParameterDto } from '../tools/dto/create-parameter.dto';

@Injectable()
export class ParameterService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateParameterDto) {
    return this.prisma.parameter.create({ data });
  }

  async find(filters: { id?: string; name?: string; code?: string; unit?: string }) {
    const { id, name, code, unit } = filters;

    if (id) {
      return this.prisma.parameter.findUnique({ where: { id } });
    }

    if (code) {
      return this.prisma.parameter.findMany({
        where: {
          code: {
            contains: code
          },
        },
      });
    }

    if (name) {
      return this.prisma.parameter.findMany({
        where: {
          name: {
            contains: name
          },
        },
      });
    }

    if (unit) {
      return this.prisma.parameter.findMany({
        where: { unit },
      });
    }

    return this.prisma.parameter.findMany();
  }
}