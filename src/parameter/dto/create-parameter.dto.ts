import { IsString } from 'class-validator';

export class CreateParameterDto {
  @IsString()
  code: string; // ex: t_2m

  @IsString()
  name: string; // ex: Temperatura a 2m

  @IsString()
  unit: string; // ex: °C
}
