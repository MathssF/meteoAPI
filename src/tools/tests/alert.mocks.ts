export const mockAlerts = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-111122223333',
    name: 'Temperatura acima de 30°C',
    localId: '3729e756-4536-4570-87ec-b90c331af3ef', // Salvador
    parameterId: 'a7175bb3-841f-4e10-83bd-c955701e21f3', // t_2m:C
    condition: '>',
    threshold: 30,
    message: 'A temperatura ultrapassou 30°C em Salvador.',
    active: true,
    createdAt: '2025-11-06T22:50:00.000Z',
    updatedAt: '2025-11-06T22:50:00.000Z',
  },
  {
    id: 'b2c3d4e5-f6a7-890b-cdef-222233334444',
    name: 'Temperatura abaixo de 10°C',
    localId: 'e330384c-1b3b-44f3-9a78-76898e91981b', // Florianópolis
    parameterId: 'a7175bb3-841f-4e10-83bd-c955701e21f3', // t_2m:C
    condition: '<',
    threshold: 10,
    message: 'A temperatura caiu abaixo de 10°C em Florianópolis.',
    active: true,
    createdAt: '2025-11-06T22:51:00.000Z',
    updatedAt: '2025-11-06T22:51:00.000Z',
  },
  {
    id: 'c3d4e5f6-a7b8-90cd-ef01-333344445555',
    name: 'Umidade acima de 90%',
    localId: '3e17c459-2350-4707-880a-405cbbfa25e0', // Vitória da Conquista
    parameterId: 'b32587ed-527e-404b-bd0d-14bbbc81af04', // rel_hum_2m:p
    condition: '>',
    threshold: 90,
    message: 'A umidade relativa do ar ultrapassou 90% em Vitória da Conquista.',
    active: true,
    createdAt: '2025-11-06T22:52:00.000Z',
    updatedAt: '2025-11-06T22:52:00.000Z',
  },
  {
    id: 'd4e5f6a7-b8c9-01de-f234-444455556666',
    name: 'Precipitação acima de 10mm/h',
    localId: 'eeaf3c14-c529-44a1-9d73-fbc80444809d', // Blumenau
    parameterId: '8d0940f8-5069-4376-8834-bf8de04a9d4a', // precip_1h:mm
    condition: '>',
    threshold: 10,
    message: 'Chuva intensa registrada (acima de 10mm/h) em Blumenau.',
    active: true,
    createdAt: '2025-11-06T22:53:00.000Z',
    updatedAt: '2025-11-06T22:53:00.000Z',
  },
  {
    id: 'e5f6a7b8-c9d0-12ef-3456-555566667777',
    name: 'Radiação solar acima de 800 W/m²',
    localId: '499d28ff-89d9-4202-ad51-1986844d81d0', // São José
    parameterId: '1fb8105c-c9a0-49ef-8fb9-48782a9d785a', // global_rad:W
    condition: '>',
    threshold: 800,
    message: 'Radiação solar intensa (acima de 800 W/m²) detectada em São José.',
    active: true,
    createdAt: '2025-11-06T22:54:00.000Z',
    updatedAt: '2025-11-06T22:54:00.000Z',
  },
];
