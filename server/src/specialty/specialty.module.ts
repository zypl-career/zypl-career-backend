import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecialtyEntity } from './_db/entity/index.js';
import { SpecialtyRepository } from './_db/repository/index.js';
import { SpecialtyController } from './specialty.controller.js';
import { SpecialtyService } from './specialty.service.js';
import { UserRepository } from '../user/_db/repository/index.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialtyEntity])],
  controllers: [SpecialtyController],
  providers: [SpecialtyService, SpecialtyRepository, UserRepository],
})
export class SpecialtyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        '/specialty/create',
        '/specialty/update',
        '/specialty/delete',
        '/specialty/export',
      );
  }
}
