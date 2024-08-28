import { Module } from '@nestjs/common';
import { CoursesController } from '../controller/_index.js';
import { CoursesService } from '../service/_index.js';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
