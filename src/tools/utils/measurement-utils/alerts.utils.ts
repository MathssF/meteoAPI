import { PrismaService } from '../../../core/data/prisma/prisma.service';

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

export async function processMeasurementAlerts(
  prisma: PrismaService,
  measurements: { localId: string; parameterId: string; value: number }[]
): Promise<CheckAlertResult[]> {
  const results: CheckAlertResult[] = [];

  for (const m of measurements) {
    const alertResults = await checkAlerts(prisma, m.localId, m.parameterId, m.value);
    results.push(...alertResults.filter(r => r.triggered));
  }

  return results;
}

export async function handleTriggeredAlerts(
  prisma: PrismaService,
  triggeredAlerts: CheckAlertResult[]
) {
  const results = [];

  for (const a of triggeredAlerts) {
    const alert = await prisma.alert.findUnique({
      where: { id: a.alertId },
      select: { id: true, message: true },
    });

    const triggered = await prisma.triggeredAlert.create({
      data: {
        alertId: a.alertId,
        value: a.value,
        message: alert?.message ?? `Alerta disparado para parâmetro ${a.parameterId}`,
      },
    });

    results.push(triggered);
  }

  return results;
}