import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParameterDto } from './dto/create-parameter.dto';

@Injectable()
export class ParameterService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateParameterDto) {
    return this.prisma.parameter.create({ data });
  }

  findAll() {
    return this.prisma.local.findMany();
  }
}
