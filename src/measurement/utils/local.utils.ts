import { PrismaService } from '../../prisma/prisma.service';
import { Local } from '../interfaces/measurements.interface';

export async function findOrCreateLocations(prisma: PrismaService, inputLocs: any[]) {
  const locations: Local[] = [];

  for (const l of inputLocs) {
    if (l.id) {
      const found = await prisma.local.findUnique({ where: { id: l.id } });
      if (found) { locations.push(found); continue; }
    }

    if (l.lat == null || l.lon == null) {
      throw new Error('❌ Para criar um local, é necessário informar lat e lon.');
    }

    let existing = await prisma.local.findFirst({ where: { lat: l.lat, lon: l.lon } });
    if (!existing) {
      existing = await prisma.local.create({
        data: { name: l.name ?? 'Local sem nome', lat: l.lat, lon: l.lon },
      });
    }

    locations.push(existing);
  }

  return locations;
}
