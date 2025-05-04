import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/_db/entity/index.js';
import { UserRepository } from '../user/_db/repository/index.js';

import { UserStatisticsController } from './statistics.controller.js';
import { UserStatisticsService } from './statistics.service.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserStatisticsController],
  providers: [UserStatisticsService, UserRepository],
})
export class StatisticsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes('/statistics/users', '/statistics/users/export');
  }
}
