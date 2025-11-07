import { PrismaService } from '../../../core/data/prisma/prisma.service';

interface CheckAlertResult {
  alertId: string;
  localId: string;
  parameterId: string;
  value: number;
  triggered: boolean;
  message?: string | null;
}

export async function checkAlerts(
  prisma: PrismaService,
  localId: string,
  parameterId: string,
  value: number
): Promise<CheckAlertResult[]> {
  // Busca alertas ativos para o local e parâmetro
  const alerts = await prisma.alert.findMany({
    where: {
      localId,
      parameterId,
      active: true,
    },
    select: {
      id: true,
      localId: true,
      parameterId: true,
      condition: true,
      threshold: true,
      message: true,
    },
  });

  // Verifica condições e adiciona a mensagem ao retorno
  const results: CheckAlertResult[] = alerts.map(alert => {
    let triggered = false;

    switch (alert.condition) {
      case '>':
        triggered = value > alert.threshold;
        break;
      case '>=':
        triggered = value >= alert.threshold;
        break;
      case '<':
        triggered = value < alert.threshold;
        break;
      case '<=':
        triggered = value <= alert.threshold;
        break;
      case '==':
      case '=':
        triggered = value === alert.threshold;
        break;
      case '!=':
        triggered = value !== alert.threshold;
        break;
      default:
        triggered = false;
    }

    return {
      alertId: alert.id,
      localId: alert.localId,
      parameterId: alert.parameterId,
      value,
      triggered,
      message: alert.message ?? null,
    };
  });

  return results;
}
