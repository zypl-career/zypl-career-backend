import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageModule } from '../image/image.module.js';

import { CourseEntity } from './_db/entity/index.js';
import { CourseRepository } from './_db/repository/index.js';
import { CourseController } from './course.controller.js';
import { CourseService } from './course.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]), ImageModule],
  controllers: [CourseController],
  exports: [CourseService, CourseRepository],
  providers: [CourseService, CourseRepository],
})
export class CourseModule {}
