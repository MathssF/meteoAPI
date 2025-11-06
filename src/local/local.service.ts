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
}
