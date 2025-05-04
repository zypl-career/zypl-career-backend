import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageModule } from '../image/image.module.js';

import { ArticleEntity } from './_db/entity/index.js';
import { ArticleRepository } from './_db/repository/index.js';
import { ArticleController } from './article.controller.js';
import { ArticleService } from './article.service.js';
import { TxtService } from '../txt/txt.service.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';
import { UserRepository } from '../user/_db/repository/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), ImageModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository, UserRepository, TxtService],
})
export class ArticleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes('/article/create', 'article/update', 'article/delete', 'article/export');
  }
}
