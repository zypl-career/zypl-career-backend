import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from '../course/course.module.js';
import { VideoModule } from '../video/video.module.js';

import { LessonEntity } from './_db/entity/index.js';
import { LessonRepository } from './_db/repository/index.js';
import { LessonController } from './lesson.controller.js';
import { LessonService } from './lesson.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), VideoModule, CourseModule],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
})
export class LessonModule {}
