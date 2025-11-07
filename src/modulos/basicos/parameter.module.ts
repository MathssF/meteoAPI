import { Module } from '@nestjs/common';
import { ParameterService } from '../../services/parameter.service';
import { ParameterController } from '../../controllers/parameter.controller';

@Module({
  controllers: [ParameterController],
  providers: [ParameterService],
})
export class ParameterModule {}
