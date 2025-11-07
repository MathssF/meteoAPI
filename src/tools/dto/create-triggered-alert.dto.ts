import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateTriggeredAlertDto {
  @ApiProperty({ description: 'ID do alerta associado' })
  @IsString()
  alertId: string;

  @ApiProperty({ description: 'ID da medição que gerou o alerta' })
  @IsString()
  measurementId: string;

  @ApiProperty({ description: 'Valor da medição que disparou o alerta' })
  @IsNumber()
  value: number;
}
