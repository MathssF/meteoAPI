import { PrismaService } from '../../prisma/prisma.service';

interface CheckAlertResult {
  alertId: string;
  localId: string;
  parameterId: string;
  value: number;
  triggered: boolean;
}

export async function checkAlerts(
  prisma: PrismaService,
  localId: string,
  parameterId: string,
  value: number
): Promise<CheckAlertResult[]> {
  const alerts = await prisma.alert.findMany({
    where: {
      localId,
      parameterId,
      active: true,
    },
  });

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
    };
  });

  return results;
}
