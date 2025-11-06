import { PrismaService } from '../../prisma/prisma.service';
import { Local } from '../interfaces/measurements.interface';

export async function findOrCreateLocations(prisma: PrismaService, inputLocs: any[]) {
  const locations: Local[] = [];
  console.log('Entrou no find or create locations')

  for (const l of inputLocs) {
    console.log("***");
    if (l.id) {
      const found = await prisma.local.findUnique({ where: { id: l.id } });
      if (found) { locations.push(found); continue; }
    }

    if (l.lat == null || l.lon == null) {
      throw new Error('Precisa informar dados corretos.');
    }

    let existing = await prisma.local.findFirst({ where: { lat: l.lat, lon: l.lon } });
    if (!existing) {
      if (l.name) {
        existing = await prisma.local.create({
          data: { name: l.name, lat: l.lat, lon: l.lon },
        });
      }
    } else {
      locations.push(existing);
    }
  }

  return locations;
}
