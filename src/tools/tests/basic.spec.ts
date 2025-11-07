import { Test, TestingModule } from '@nestjs/testing';
import { LocalService } from '../../services/local.service';
import { ParameterService } from '../../services/parameter.service';
import { LocalController } from '../../controllers/local.controller';
import { ParameterController } from '../../controllers/parameter.controller';
import { PrismaService } from '../../core/data/prisma/prisma.service';

const prismaMock = {
  local: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
  parameter: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('',() => {
  let localService: LocalService;
  let parameterService: ParameterService;
  let localController: LocalController;
  let parameterController: ParameterController;

  beforeEach(async () => {})
})