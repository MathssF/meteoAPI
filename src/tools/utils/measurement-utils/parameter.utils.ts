import { PrismaService } from '../../../core/data/prisma/prisma.service';
import { Parameter } from '../../interfaces/measurements.interface';

export async function findValidParameters(prisma: PrismaService, inputParams: any[]) {
  const parameters: Parameter[] = [];
  const invalidParameters: typeof inputParams = [];

  console.log('Para utils');

  for (const p of inputParams) {
    let param = p.id ? await prisma.parameter.findUnique({ where: { id: p.id } }) : null;
    if (!param && p.code) param = await prisma.parameter.findUnique({ where: { code: p.code } });
    if (!param && p.name) param = await prisma.parameter.findFirst({ where: { name: p.name } });

    if (!param) invalidParameters.push(p);
    else parameters.push(param);
  }

  return { parameters, invalidParameters };
}