import { Test, TestingModule } from '@nestjs/testing';
import { mockLocals, mockParameters } from './measurement.mocks';
import { mockAlerts, mockParameterValues } from './alert.mocks';
import { mockSchedules } from './schedule.mocks';
import { MeasurementFetchService } from 'src/services/measurement.fetchs.service';
import { MeasurementPostService } from 'src/services/measurement.post.service';
import { MeasurementRandomService } from 'src/services/measurement.random.service';
import { MeasurementController } from 'src/controllers/measurement.controller';
import { ScheduleService } from 'src/services/schedule.service';
import { ScheduleController } from 'src/controllers/schedule.controller';
import { AlertService } from 'src/services/alert.service';
import { AlertController } from 'src/controllers/alert.controller';
import { PrismaService } from 'src/core/data/prisma/prisma.service';

describe('', () => {
  let controller: MeasurementController;
  let randomService: MeasurementRandomService;
  let postService: MeasurementPostService;
  let fetchService: MeasurementFetchService;

  let scheduleC: ScheduleController;
  let scheduleS: ScheduleService;
  let alertC: AlertController;
  let alertS: AlertService;


   const prismaMock = {
    local: {
      findMany: jest.fn().mockResolvedValue(mockLocals),
      findUnique: jest.fn((args) =>
        Promise.resolve(mockLocals.find((l) => l.id === args.where.id)),
      ),
    },
    parameter: {
      findMany: jest.fn().mockResolvedValue(mockParameters),
      findUnique: jest.fn((args) =>
        Promise.resolve(mockParameters.find((p) => p.id === args.where.id)),
      ),
    },
    alert: {
      findMany: jest.fn().mockResolvedValue(mockAlerts),
    },
    schedule: {
      findMany: jest.fn().mockResolvedValue(mockSchedules),
    },
    measurement: {
      create: jest.fn().mockImplementation((data) => ({
        id: 'test-measurement-id',
        ...data.data,
      })),
    },
    triggeredAlert: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasurementController, ScheduleController, AlertController],
      providers: [
        MeasurementFetchService,
        MeasurementPostService,
        MeasurementRandomService,
        ScheduleService,
        AlertService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    controller = module.get<MeasurementController>(MeasurementController);
    randomService = module.get<MeasurementRandomService>(MeasurementRandomService);
  });

  
})