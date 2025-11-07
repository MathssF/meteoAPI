import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateAlertDto } from '../tools/dto/create-alert.dto';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAlertDto) {
      return this.prisma.alert.create({ data });
    }
  
    findAll() {
      return this.prisma.alert.findMany();
    }

    findByLocalId(localId: string) {
    return this.prisma.alert.findMany({
      where: { localId },
    });
  }

  findByParameterId(parameterId: string) {
    return this.prisma.alert.findMany({
      where: { parameterId },
    });
  }

  findByLocalAndParameter(localId: string, parameterId: string) {
    return this.prisma.alert.findMany({
      where: { localId, parameterId },
    });
  }
}
