import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UniversityEntity } from './_db/entity/index.js';
import { UniversityRepository } from './_db/repository/index.js';
import { UniversityController } from './university.controller.js';
import { UniversityService } from './university.service.js';
import { TxtService } from '../txt/txt.service.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';
import { UserRepository } from '../user/_db/repository/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([UniversityEntity])],
  controllers: [UniversityController],
  providers: [UniversityService, UniversityRepository, UserRepository, TxtService],
})
export class UniversityModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        '/university/create',
        'university/update',
        'university/delete',
        'university/export',
      );
  }
}
