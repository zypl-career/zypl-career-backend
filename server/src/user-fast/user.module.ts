import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from '../email/email.module.js';

import { UserFastEntity } from './_db/entity/index.js';
import { UserFastRepository } from './_db/repository/index.js';
import { UserController } from './user.controller.js';
import { UserFastService } from './user.service.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { UserRepository } from '../user/_db/repository/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserFastEntity]), EmailModule],
  controllers: [UserController],
  exports: [UserFastRepository],
  providers: [UserFastService, UserFastRepository, UserRepository],
})
export class UserFastModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes({ path: '/user-fast/get', method: RequestMethod.GET }, '/user-fast/export');
    consumer.apply(AuthMiddleware).forRoutes('/user-fast/delete', '/user-fast/update', {
      path: '/user-fast/get/:id',
      method: RequestMethod.GET,
    });
  }
}
