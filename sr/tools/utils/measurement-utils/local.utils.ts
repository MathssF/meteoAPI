import { PrismaService } from '../../../services/prisma.service';
import { Local } from '../../interfaces/measurements.interface';

export async function findOrCreateLocations(prisma: PrismaService, inputLocs: any[]) {
  const locations: Local[] = [];

  for (const l of inputLocs) {
    let added = false
    if (l.id) {
      const found = await prisma.local.findUnique({ where: { id: l.id } });
      if (found) { locations.push(found); continue; }
    }

    if (l.name) {
      const foundByName = await prisma.local.findUnique({ where: { name: l.name } });
      if (foundByName) {
        locations.push(foundByName);
        continue;
      }
    }

    if (l.lat != null && l.lon != null) {
      const foundByCoords = await prisma.local.findFirst({ where: { lat: l.lat, lon: l.lon } });
      if (foundByCoords) {
        locations.push(foundByCoords);
        continue;
      }

      if (l.name) {
        const newLocal = await prisma.local.create({
          data: { name: l.name, lat: l.lat, lon: l.lon },
        });
        locations.push(newLocal);
        continue;
      }
    }

    console.log(`Local ignorado: ${JSON.stringify(l)}`);
  }

  return locations;
}
