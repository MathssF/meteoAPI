import { IsString, IsNumber } from 'class-validator';

export class CreateLocalDto {
  @IsString()
  name: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;
}
