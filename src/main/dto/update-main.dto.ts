import { PartialType } from '@nestjs/swagger';
import { CreateMainDto } from './create-main.dto';

export class UpdateMainDto extends PartialType(CreateMainDto) {}
