import { IsArray, IsOptional, IsString, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LocationInput {
  @ApiPropertyOptional({ description: 'ID da cidade' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ description: 'Nome da cidade' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Latitude da cidade' })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional({ description: 'Longitude da cidade' })
  @IsOptional()
  @IsNumber()
  lon?: number;
}

export class ParameterInput {
  @ApiPropertyOptional({ description: 'ID do parâmetro utilizado' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ description: 'Código do parâmetro' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ description: 'Nome do parâmetro' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Unidade do parâmetro', example: '°C' })
  @IsOptional()
  @IsString()
  unit?: string;
}

export class FetchMeasurementsDto {
  @ApiProperty({ type: [ParameterInput], description: 'Lista de parâmetros a serem buscados' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParameterInput)
  parameters: ParameterInput[];

  @ApiProperty({ type: [LocationInput], description: 'Lista de cidades para busca das medições' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationInput)
  locations: LocationInput[];

  @ApiPropertyOptional({ description: 'Data das medições no formato ISO 8601', example: '2025-11-05T12:00:00Z' })
  @IsOptional()
  @IsString()
  date?: string;
}
