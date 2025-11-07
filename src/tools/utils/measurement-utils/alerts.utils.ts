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
  value: number,
  measurementId: string
): Promise<CheckAlertResult[]> {
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

  const results: CheckAlertResult[] = [];

  for (const alert of alerts) {
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

    const result: CheckAlertResult = {
      alertId: alert.id,
      localId: alert.localId,
      parameterId: alert.parameterId,
      value,
      triggered,
      message: alert.message ?? null,
    };

    if (triggered) {
      await prisma.triggeredAlert.create({
        data: {
          alertId: alert.id,
          measurementId,
          value,
        },
      });
    }

    results.push(result);
  }

  return results;
}
