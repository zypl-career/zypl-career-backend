import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from '../course/course.module.js';
import { PdfModule } from '../pdf/pdf.module.js';
import { VideoModule } from '../video/video.module.js';

import { LessonEntity } from './_db/entity/index.js';
import { LessonRepository } from './_db/repository/index.js';
import { LessonController } from './lesson.controller.js';
import { LessonService } from './lesson.service.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { UserRepository } from '../user/_db/repository/index.js';
import { UserFastRepository } from '../user-fast/_db/repository/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), VideoModule, CourseModule, PdfModule],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository, UserRepository, UserFastRepository],
})
export class LessonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes('/lesson/create', '/lesson/update', '/lesson/delete', '/lesson/export');
    consumer.apply(AuthMiddleware).forRoutes('/lesson/submit');
  }
}
