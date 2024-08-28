import { Module } from '@nestjs/common';
import { LessonsController } from '../controller/_index.js';
import { LessonsService } from '../service/_index.js';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
