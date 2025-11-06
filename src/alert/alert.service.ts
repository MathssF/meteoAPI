import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAlertDto) {
      return this.prisma.alert.create({ data });
    }
  
    findAll() {
      return this.prisma.alert.findMany();
    }
}
