import { IsArray, IsOptional, IsString, ValidateNested, IsObject, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class LocationInput {
  @IsOptional()
  @IsString()
  id?: string; // caso já exista no banco

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lon?: number;
}

class ParameterInput {
  @IsOptional()
  @IsString()
  id?: string; // caso já exista no banco

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  unit?: string;
}

export class FetchMeasurementsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParameterInput)
  parameters: ParameterInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationInput)
  locations: LocationInput[];

  @IsOptional()
  @IsString()
  date?: string; // opcional, ex: "2025-11-05T12:00:00Z"
}
