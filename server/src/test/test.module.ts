import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module.js';

import { TestEntity } from './_db/entity/index.js';
import { TestRepository } from './_db/repository/index.js';
import { TestController } from './test.controller.js';
import { TestService } from './test.service.js';
import { InfoTestEntity } from './_db/entity/info-test.js';
import { InfoTestRepository } from './_db/repository/info-test.js';
import { UserRepository } from '../user/_db/repository/index.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { UserFastRepository } from '../user-fast/_db/repository/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity, InfoTestEntity]), UserModule],
  controllers: [TestController],
  providers: [TestService, TestRepository, InfoTestRepository, UserRepository, UserFastRepository],
})
export class TestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes('/test/export', '/test/export-info-test');
  }
}
