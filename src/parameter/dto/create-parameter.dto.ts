import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParameterDto {
  @ApiProperty({ description: 'Código do parâmetro', example: 't_2m' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Nome do parâmetro', example: 'Temperatura a 2m' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Unidade do parâmetro', example: '°C' })
  @IsString()
  unit: string;
}
