import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateLocalDto {
  @ApiProperty({ description: 'Nome da cidade' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Latitude da cidade', example: -10.5015 })
  @IsNumber()
  lat: number;

  @ApiProperty({ description: 'Longitude da cidade', example: 35.0545 })
  @IsNumber()
  lon: number;
}
