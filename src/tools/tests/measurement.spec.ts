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
import { Local, Parameter, Measurement } from '../interfaces/measurements.interface';
import { FetchMeasurementsDto, LocationInput, ParameterInput } from '../dto/fetch-measurements.dto';
import { post } from 'axios';

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
    postService = module.get<MeasurementPostService>(MeasurementPostService);

  jest
    .spyOn(randomService, 'execute')
    .mockImplementation(async (localId, parameterId, date?: string) => {
      const param = mockParameterValues.find((p) => p.parameterId === parameterId);
      const value = param
        ? param.possibleValues[Math.floor(Math.random() * param.possibleValues.length)]
        : 0;

      return {
        status: 'ok',
        measurement: {
        id: crypto.randomUUID(),    // ou outro gerador de UUID
        localId,
        parameterId,
        value,
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        batchId: null,
        scheduleId: null,
      },
        alertsTriggered: [],
      };
    });
  });

  const isValidValueForParameter = (parameterId: string, value: number) => {
    const param = mockParameterValues.find(p => p.parameterId === parameterId);
    return param ? param.possibleValues.includes(value) : false;
  };

  it('deve gerar 2 medições aleatórias com idCounts [1, 2]', async () => {
    const date = new Date().toISOString();
    const result = await randomService.getRandomIds(1, 2);

    expect(Array.isArray(result)).toBe(true);
    expect(result.randomLocals).toBe(1);
    expect(result.randomParams).toBe(2);

    let meansures: any[] = []

    result.randomLocals.forEach(async (elem) => {
      result.randomParams.forEach(async (item) => {
        const data = await randomService.execute(elem, item);
        meansures.push(data);
      })
    });

    expect(meansures.length).toBe(2);
  });


  it('deve gerar 6 medições quando idCounts for [4, 2], considerando 3 cidades distintas', async () => {
    const date = new Date().toISOString();
    const result = await randomService.getRandomIds(4, 2);

    expect(result.randomLocals).toBe(3);
    expect(result.randomParams).toBe(2);

    let meansures: any[] = []

    result.randomLocals.forEach(async (elem) => {
      result.randomParams.forEach(async (item) => {
        const data = await randomService.execute(elem, item);
        meansures.push(data);
      })
    });

    expect(meansures.length).toBe(6);
  });

  it('Testar o Post', async () => {
    const testLocal1: LocationInput[] = [
      {id: "3729e756-4536-4570-87ec-b90c331af3ef"},
      {id: "e330384c-1b3b-44f3-9a78-76898e91981b"},
      {id: "invalidID"},
    ];
    const testLocal2: LocationInput[] = [
      {name: 'Salvador'},
      {lat: -14.8615, lon: -40.8445}
    ];
    const testParameter: ParameterInput[] = [
      {id: "06d4c780-338f-4ab6-a361-20c62801998a"},
      {id: "invalidID"},
      {code: "precip_1h:mm"}
    ];
    const timeNow = new Date();
    const dto1: FetchMeasurementsDto = {parameters: testParameter, locations: testLocal1 };
    const dto2: FetchMeasurementsDto = {parameters: [testParameter[0], testParameter[2]], locations: testLocal2 }
    const result1 = await postService.executeFetch(dto1, timeNow.toString());
    const result2 = await postService.executeFetch(dto2, timeNow.toString())

    expect(result1);
    expect(result2);
    expect(result1.invalidParameters.length).toBe(1);
    expect(result2.invalidParameters.length).toBe(0);
    expect(result1.status).toBe('ok');
  })
})