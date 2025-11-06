import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  localId: string;

  @IsString()
  parameterId: string;

  @IsString()
  time: string; // "HH:MM"

  @IsString()
  when: string; // ex: "mon,tue" ou "10,20,30"

  @IsBoolean()
  @IsOptional()
  active?: boolean; // default true
}
