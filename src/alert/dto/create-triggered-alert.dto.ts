import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateTriggeredAlertDto {
  @IsString()
  alertId: string;

  @IsString()
  localId: string;

  @IsString()
  parameterId: string;

  @IsNumber()
  value: number;

  @IsDate()
  alertDate: Date;

  @IsString()
  alertTime: string; // formato "HH:MM"
}
