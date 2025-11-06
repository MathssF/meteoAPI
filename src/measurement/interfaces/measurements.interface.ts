export interface Local {
  id: string;
  name: string;
  lat: number;
  lon: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Parameter {
  id: string;
  code: string;
  name: string;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Measurement {
  id: string;
  localId: string;
  parameterId: string;
  timestamp: Date;
  value: number;
  batchId?: string | null;
  scheduleId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}