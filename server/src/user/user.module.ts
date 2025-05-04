import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from '../email/email.module.js';

import { UserEntity } from './_db/entity/index.js';
import { UserRepository } from './_db/repository/index.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { UserFastRepository } from '../user-fast/_db/repository/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), EmailModule],
  controllers: [UserController],
  exports: [UserRepository],
  providers: [UserService, UserRepository, UserFastRepository],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes({ path: '/user/get', method: RequestMethod.GET }, '/user/export');
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        '/user/send-code',
        '/user/verify-email',
        '/user/update',
        '/user/change-password',
        '/user/delete',
        '/user/access-parent',
        {
          path: '/user/get/:id',
          method: RequestMethod.GET,
        },
      );
  }
}
