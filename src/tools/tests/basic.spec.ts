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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalController, ParameterController],
      providers: [
        LocalService,
        ParameterService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    localService = module.get<LocalService>(LocalService);
    parameterService = module.get<ParameterService>(ParameterService);
    localController = module.get<LocalController>(LocalController);
    parameterController = module.get<ParameterController>(ParameterController);
  })
})