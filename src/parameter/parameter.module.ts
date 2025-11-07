import { Module } from '@nestjs/common';
import { ParameterService } from '../../sr/services/parameter.service';
import { ParameterController } from '../../sr/controllers/parameter.controller';

@Module({
  controllers: [ParameterController],
  providers: [ParameterService],
})
export class ParameterModule {}
