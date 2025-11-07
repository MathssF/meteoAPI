export const mockSchedules = [
  // ---- 14h Schedules ----
  {
    id: '10000000-0000-0000-0000-000000000001',
    name: 'Coleta de temperatura 14h - Salvador',
    localId: '3729e756-4536-4570-87ec-b90c331af3ef', // Salvador
    parameterId: 'a7175bb3-841f-4e10-83bd-c955701e21f3', // Temperatura do ar a 2m
    time: '14:00',
    active: true,
    createdAt: '2025-11-06T10:00:00.000Z',
    updatedAt: '2025-11-06T10:00:00.000Z',
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    name: 'Coleta de umidade 14h - Vitória da Conquista',
    localId: '3e17c459-2350-4707-880a-405cbbfa25e0', // Vitória da Conquista
    parameterId: 'b32587ed-527e-404b-bd0d-14bbbc81af04', // Umidade relativa
    time: '14:00',
    active: true,
    createdAt: '2025-11-06T10:00:00.000Z',
    updatedAt: '2025-11-06T10:00:00.000Z',
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    name: 'Coleta de precipitação 14h - Blumenau',
    localId: 'eeaf3c14-c529-44a1-9d73-fbc80444809d', // Blumenau
    parameterId: '8d0940f8-5069-4376-8834-bf8de04a9d4a', // Precipitação 1h
    time: '14:00',
    active: true,
    createdAt: '2025-11-06T10:00:00.000Z',
    updatedAt: '2025-11-06T10:00:00.000Z',
  },

  // ---- 16h Schedules ----
  {
    id: '10000000-0000-0000-0000-000000000004',
    name: 'Coleta de radiação solar 16h - São José',
    localId: '499d28ff-89d9-4202-ad51-1986844d81d0', // São José
    parameterId: '1fb8105c-c9a0-49ef-8fb9-48782a9d785a', // Radiação global
    time: '16:00',
    active: true,
    createdAt: '2025-11-06T10:00:00.000Z',
    updatedAt: '2025-11-06T10:00:00.000Z',
  },
  {
    id: '10000000-0000-0000-0000-000000000005',
    name: 'Coleta de temperatura mínima 16h - Florianópolis',
    localId: 'e330384c-1b3b-44f3-9a78-76898e91981b', // Florianópolis
    parameterId: '1cf6af46-ce23-4e15-ba3b-33905a289c3d', // Temperatura mínima 24h
    time: '16:00',
    active: true,
    createdAt: '2025-11-06T10:00:00.000Z',
    updatedAt: '2025-11-06T10:00:00.000Z',
  },
  {
    id: '10000000-0000-0000-0000-000000000006',
    name: 'Coleta de pressão atmosférica 16h - Salvador',
    localId: '3729e756-4536-4570-87ec-b90c331af3ef', // Salvador
    parameterId: 'f5ae3b4a-1dd9-4841-8fad-c7203cb5f442', // Pressão ao nível do mar
    time: '16:00',
    active: false, // desativado de propósito
    createdAt: '2025-11-06T10:00:00.000Z',
    updatedAt: '2025-11-06T10:00:00.000Z',
  },
];
