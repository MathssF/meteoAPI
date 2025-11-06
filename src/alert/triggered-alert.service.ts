import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTriggeredAlertDto } from './dto/create-triggered-alert.dto';

@Injectable()
export class TriggeredAlertService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTriggeredAlertDto) {
    return this.prisma.triggeredAlert.create({ data });
  }

  findById(id: string) {
    return this.prisma.triggeredAlert.findUnique({ where: { id } });
  }

  findByAlertId(alertId: string) {
    return this.prisma.triggeredAlert.findMany({ where: { alertId } });
  }

  findByLocalId(localId: string) {
    return this.prisma.triggeredAlert.findMany({ where: { localId } });
  }
}
