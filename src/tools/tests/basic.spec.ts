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

describe('Testando o Controller e o Service dos módulos Básicos: Local e Parameter',() => {
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

  jest.clearAllMocks();

  describe('LocalService', () => {
    it('deve criar um local', async () => {
      const dto = { name: 'São Paulo', lat: -23.55, lon: -46.63 };
      prismaMock.local.create.mockResolvedValue({ id: '1', ...dto });

      const result = await localService.create(dto);
      expect(result).toEqual({ id: '1', ...dto });
      expect(prismaMock.local.create).toHaveBeenCalledWith({ data: dto });
    });

    it('deve buscar local por ID', async () => {
      prismaMock.local.findUnique.mockResolvedValue({ id: '1', name: 'São Paulo' });
      const result = await localService.find({ id: '1' });
      expect(result).toEqual({ id: '1', name: 'São Paulo' });
      expect(prismaMock.local.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('deve buscar locais por coordenadas', async () => {
      prismaMock.local.findMany.mockResolvedValue([{ id: '2', lat: -23.55, lon: -46.63 }]);
      const result = await localService.find({ lat: '-23.55', lon: '-46.63' });
      expect(result).toEqual([{ id: '2', lat: -23.55, lon: -46.63 }]);
    });

    it('deve buscar locais por nome', async () => {
      prismaMock.local.findMany.mockResolvedValue([{ id: '3', name: 'Curitiba' }]);
      const result = await localService.find({ name: 'Curitiba' });
      expect(result).toEqual([{ id: '3', name: 'Curitiba' }]);
    });

    it('deve listar todos os locais', async () => {
      prismaMock.local.findMany.mockResolvedValue([{ id: '4', name: 'Recife' }]);
      const result = await localService.find({});
      expect(result).toEqual([{ id: '4', name: 'Recife' }]);
    });
  });



  describe('ParameterService', () => {
    it('deve criar um parâmetro', async () => {
      const dto = { code: 't_2m', name: 'Temperatura', unit: '°C' };
      prismaMock.parameter.create.mockResolvedValue({ id: 'p1', ...dto });

      const result = await parameterService.create(dto);
      expect(result).toEqual({ id: 'p1', ...dto });
      expect(prismaMock.parameter.create).toHaveBeenCalledWith({ data: dto });
    });

    it('deve buscar parâmetro por ID', async () => {
      prismaMock.parameter.findUnique.mockResolvedValue({ id: 'p1', code: 't_2m' });
      const result = await parameterService.find({ id: 'p1' });
      expect(result).toEqual({ id: 'p1', code: 't_2m' });
    });

    it('deve buscar parâmetro por código', async () => {
      prismaMock.parameter.findMany.mockResolvedValue([{ id: 'p2', code: 't_2m' }]);
      const result = await parameterService.find({ code: 't_2m' });
      expect(result).toEqual([{ id: 'p2', code: 't_2m' }]);
    });

    it('deve buscar parâmetro por nome', async () => {
      prismaMock.parameter.findMany.mockResolvedValue([{ id: 'p3', name: 'Umidade' }]);
      const result = await parameterService.find({ name: 'Umidade' });
      expect(result).toEqual([{ id: 'p3', name: 'Umidade' }]);
    });

    it('deve listar todos os parâmetros', async () => {
      prismaMock.parameter.findMany.mockResolvedValue([{ id: 'p4', name: 'Pressão' }]);
      const result = await parameterService.find({});
      expect(result).toEqual([{ id: 'p4', name: 'Pressão' }]);
    });
  });

  describe('LocalController', () => {
    it('deve chamar service.create ao criar local', async () => {
      const dto = { name: 'Manaus', lat: -3.1, lon: -60.02 };
      prismaMock.local.create.mockResolvedValue({ id: 'l5', ...dto });

      const result = await localController.create(dto);
      expect(result).toEqual({ id: 'l5', ...dto });
      expect(prismaMock.local.create).toHaveBeenCalled();
    });

    it('deve chamar service.find ao buscar locais', async () => {
      prismaMock.local.findMany.mockResolvedValue([{ id: 'l6', name: 'Natal' }]);
      const result = await localController.find(undefined, undefined, undefined, 'Natal');
      expect(result).toEqual([{ id: 'l6', name: 'Natal' }]);
    });
  });


  describe('ParameterController', () => {
    it('deve chamar service.create ao criar parâmetro', async () => {
      const dto = { code: 'wind_speed', name: 'Vento', unit: 'm/s' };
      prismaMock.parameter.create.mockResolvedValue({ id: 'p6', ...dto });

      const result = await parameterController.create(dto);
      expect(result).toEqual({ id: 'p6', ...dto });
      expect(prismaMock.parameter.create).toHaveBeenCalled();
    });

    it('deve chamar service.find ao buscar parâmetros', async () => {
      prismaMock.parameter.findMany.mockResolvedValue([{ id: 'p7', name: 'Radiação' }]);
      const result = await parameterController.find(undefined, 'Radiação');
      expect(result).toEqual([{ id: 'p7', name: 'Radiação' }]);
    });
  });
});