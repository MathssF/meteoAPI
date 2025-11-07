import { Test, TestingModule } from '@nestjs/testing';
import { AlertController } from '../../controllers/alert.controller';
import { AlertService } from '../../services/alert.service';
import { PrismaService } from '../../core/data/prisma/prisma.service';

// Mock do Prisma
const prismaMock = {
  alert: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
  triggeredAlert: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('AlertController & AlertService', () => {
  let controller: AlertController;
  let service: AlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertController],
      providers: [
        AlertService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    controller = module.get<AlertController>(AlertController);
    service = module.get<AlertService>(AlertService);

    jest.clearAllMocks();
  });

  // ======= SERVICE TESTS =======
  describe('AlertService', () => {
    it('deve criar um alerta', async () => {
      const dto = {
        localId: '1',
        parameterId: '2',
        condition: '>',
        threshold: 30,
        active: true,
      };
      prismaMock.alert.create.mockResolvedValue({ id: 'abc123', ...dto });

      const result = await service.createAlert(dto);
      expect(prismaMock.alert.create).toHaveBeenCalledWith({ data: dto });
      expect(result.id).toBe('abc123');
    });

    it('deve buscar alerta por ID', async () => {
      prismaMock.alert.findUnique.mockResolvedValue({ id: 'xyz', condition: '>' });
      const result = await service.find({ id: 'xyz' });
      expect(prismaMock.alert.findUnique).toHaveBeenCalledWith({ where: { id: 'xyz' } });
      expect(result).toEqual({ id: 'xyz', condition: '>' });
    });

    it('deve buscar alertas por localId e parameterId', async () => {
      prismaMock.alert.findMany.mockResolvedValue([{ id: 'a1' }, { id: 'a2' }]);
      const result = await service.find({ localId: 'loc1', parameterId: 'par1' });
      expect(prismaMock.alert.findMany).toHaveBeenCalledWith({
        where: { localId: 'loc1', parameterId: 'par1' },
      });
      expect(result.length).toBe(2);
    });

    it('deve criar um triggeredAlert', async () => {
      const dto = {
        alertId: '1',
        value: 45,
        measurementId: 'm1',
        createdAt: new Date(),
      };
      prismaMock.triggeredAlert.create.mockResolvedValue({ id: 't1', ...dto });

      const result = await service.createTriggeredAlert(dto);
      expect(prismaMock.triggeredAlert.create).toHaveBeenCalledWith({ data: dto });
      expect(result.id).toBe('t1');
    });

    it('deve buscar triggeredAlerts por alertId', async () => {
      const mock = [
        {
          id: 't1',
          createdAt: new Date(),
          value: 12,
          alertId: '1',
          measurementId: 'm1',
        },
      ];
      prismaMock.triggeredAlert.findMany.mockResolvedValue(mock);

      const result = await service.findTriggered({ alertId: '1' });
      expect(prismaMock.triggeredAlert.findMany).toHaveBeenCalledWith({
        where: { alertId: '1' },
      });
      expect(result[0].id).toBe('t1');
    });
  });

  // ======= CONTROLLER TESTS =======
  describe('AlertController', () => {
    it('POST /alert deve chamar service.createAlert', async () => {
      const dto = {
        localId: '1',
        parameterId: '2',
        condition: '>=',
        threshold: 20,
        active: true,
      };
      jest.spyOn(service, 'createAlert').mockResolvedValue({ id: 'abc123', ...dto });

      const result = await controller.createAlert(dto);
      expect(service.createAlert).toHaveBeenCalledWith(dto);
      expect(result.id).toBe('abc123');
    });

    it('GET /alert deve chamar service.find', async () => {
      const mock = [{ id: 'a1', condition: '>' }];
      jest.spyOn(service, 'find').mockResolvedValue(mock);

      const result = await controller.findAlerts('1', '2', '3');
      expect(service.find).toHaveBeenCalledWith({ id: '1', localId: '2', parameterId: '3' });
      expect(result).toEqual(mock);
    });

    it('POST /alert/triggered deve chamar service.createTriggeredAlert', async () => {
      const dto = {
        alertId: '1',
        measurementId: 'm1',
        value: 33,
        createdAt: new Date(),
      };
      jest.spyOn(service, 'createTriggeredAlert').mockResolvedValue({ id: 'ttt', ...dto });

      const result = await controller.createTriggeredAlert(dto);
      expect(service.createTriggeredAlert).toHaveBeenCalledWith(dto);
      expect(result.id).toBe('ttt');
    });

    it('GET /alert/triggered deve chamar service.findTriggered', async () => {
      const mock = [
        {
          id: 't1',
          createdAt: new Date(),
          value: 15,
          alertId: '1',
          measurementId: 'm1',
        },
      ];
      jest.spyOn(service, 'findTriggered').mockResolvedValue(mock);

      const result = await controller.findTriggeredAlerts('1', '2');
      expect(service.findTriggered).toHaveBeenCalledWith({ id: '1', alertId: '2' });
      expect(result).toEqual(mock);
    });
  });
});
