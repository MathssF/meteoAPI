import { IsArray, IsBoolean, IsString, ArrayNotEmpty } from 'class-validator';

export class DevCheckDto {
  @IsArray()
  @IsString({ each: true })
  L: string[];

  @IsArray()
  @IsString({ each: true })
  P: string[];

  @IsBoolean()
  V: boolean;
}
