import { IsArray, IsString, IsOptional } from 'class-validator';

export class FetchMeasurementsDto {
  @IsArray()
  parameters: string[]; // ex: ['t_2m:C', 'wind_speed_10m:ms']

  @IsArray()
  locations: { lat: number; lon: number; name?: string }[];

  @IsOptional()
  @IsString()
  date?: string; // opcional, ex: "2025-11-05T12:00:00Z"
}
