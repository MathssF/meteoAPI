import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateTriggeredAlertDto {
  @IsString()
  alertId: string;

  @IsString()
  measurementId: string;

  @IsNumber()
  value: number;
}
