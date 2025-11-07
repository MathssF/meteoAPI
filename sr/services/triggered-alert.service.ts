import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateTriggeredAlertDto } from '../tools/dto/create-triggered-alert.dto';

@Injectable()
export class TriggeredAlertService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTriggeredAlertDto) {
    return this.prisma.triggeredAlert.create({ data });
  }

  findById(id: string) {
    return this.prisma.triggeredAlert.findUnique({ where: { id } });
  }
}
