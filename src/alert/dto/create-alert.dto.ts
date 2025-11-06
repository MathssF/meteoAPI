import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateAlertDto {
  @ApiProperty({ description: 'ID do Cidade ao qual o alerta faz referência' })
  @IsString()
  localId: string;

  @ApiProperty({ description: 'ID do parâmetro metereorológico monitorado pelo alerta' })
  @IsString()
  parameterId: string;

  @ApiProperty({ description: 'Condição do alerta, se é maior, menor...  ex: ">", "<=", etc.' })
  @IsString()
  condition: string;

  @ApiProperty({ description: 'Valor limite do alerta' })
  @IsNumber()
  threshold: number;

  @IsBoolean()
  active: boolean;
}
