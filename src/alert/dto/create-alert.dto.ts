import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  localId: string;

  @IsString()
  parameterId: string;

  @IsString()
  condition: string; // ">", "<=", etc.

  @IsNumber()
  threshold: number;

  @IsBoolean()
  active: boolean;
}
