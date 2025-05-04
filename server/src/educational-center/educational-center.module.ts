import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageModule } from '../image/image.module.js';

import { EducationCenterEntity } from './_db/entity/index.js';
import { EducationCenterRepository } from './_db/repository/index.js';
import { EducationCenterController } from './educational-center.controller.js';
import { EducationalCenterService } from './educational-center.service.js';
import { TxtService } from '../txt/txt.service.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';
import { UserRepository } from '../user/_db/repository/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([EducationCenterEntity]), ImageModule],
  controllers: [EducationCenterController],
  providers: [EducationalCenterService, EducationCenterRepository, TxtService, UserRepository],
})
export class EducationalCentersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        '/education-center/create',
        '/education-center/update',
        '/education-center/delete',
        '/education-center/export',
      );
  }
}
