import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty({ description: 'ID do local relacionado', example: '3e17c459-2350-4707-880a-405cbbfa25e0' })
  @IsString()
  localId: string;

  @ApiProperty({ description: 'ID do parâmetro relacionado', example: '06954069-5b40-4bb3-aa98-25dd17d23ed5' })
  @IsString()
  parameterId: string;

  @ApiProperty({ description: 'Hora do agendamento no formato HH:MM', example: '12:30' })
  @IsString()
  time: string;

  @ApiProperty({ description: 'Dias ou minutos do agendamento (ex: "mon,tue" ou "10,20,30")', example: 'mon,wed,fri' })
  @IsString()
  when: string;

  @ApiPropertyOptional({ description: 'Indica se o agendamento está ativo', example: true, default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
