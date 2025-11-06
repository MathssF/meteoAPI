import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma conectado ao banco de dados');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🛑 Prisma desconectado');
  }

  async cleanDatabase() {
    const modelKeys = Reflect.ownKeys(this)
      .filter((key): key is string => typeof key === 'string' && key[0] !== '_' && typeof (this as any)[key]?.deleteMany === 'function');

    for (const key of modelKeys) {
      await (this as any)[key].deleteMany();
    }
  }
}
