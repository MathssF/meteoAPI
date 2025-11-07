import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/data/prisma/prisma.service';
import { CreateAlertDto } from '../tools/dto/create-alert.dto';
import { CreateTriggeredAlertDto } from '../tools/dto/create-triggered-alert.dto';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}

  async createAlert(data: CreateAlertDto) {
    return this.prisma.alert.create({ data });
  }

  async find(filters: { id?: string; localId?: string; parameterId?: string }) {
    const { id, localId, parameterId } = filters;

    if (id) {
      return this.prisma.alert.findUnique({ where: { id } });
    }

    if (localId && parameterId) {
      return this.prisma.alert.findMany({ where: { localId, parameterId } });
    }

    if (localId) {
      return this.prisma.alert.findMany({ where: { localId } });
    }

    if (parameterId) {
      return this.prisma.alert.findMany({ where: { parameterId } });
    }

    return this.prisma.alert.findMany();
  }

  async createTriggeredAlert(data: CreateTriggeredAlertDto) {
    return this.prisma.triggeredAlert.create({ data });
  }

  async findTriggered(filters: { id?: string; alertId?: string; localId?: string }) {
    const { id, alertId, localId } = filters;

    if (id) {
      return this.prisma.triggeredAlert.findUnique({ where: { id } });
    }

    if (alertId) {
      return this.prisma.triggeredAlert.findMany({ where: { alertId } });
    }

    return this.prisma.triggeredAlert.findMany();
  }
}