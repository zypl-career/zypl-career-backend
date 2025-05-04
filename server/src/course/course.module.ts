import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageModule } from '../image/image.module.js';

import { CourseEntity } from './_db/entity/index.js';
import { CourseRepository } from './_db/repository/index.js';
import { CourseController } from './course.controller.js';
import { CourseService } from './course.service.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';
import { UserRepository } from '../user/_db/repository/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]), ImageModule],
  controllers: [CourseController],
  exports: [CourseService, CourseRepository],
  providers: [CourseService, CourseRepository, UserRepository],
})
export class CourseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes('/course/create', '/course/update', '/course/delete', '/course/export');
  }
}
