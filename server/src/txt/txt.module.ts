import { Module } from '@nestjs/common';
import { TxtController } from './txt.controller.js';
import { TxtService } from './txt.service.js';

@Module({
  providers: [TxtService],
  exports: [TxtService],
  controllers: [TxtController],
})
export class TxtModule {}
