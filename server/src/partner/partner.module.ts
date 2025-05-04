import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageModule } from '../image/image.module.js';

import { PartnerEntity } from './_db/entity/index.js';
import { PartnerRepository } from './_db/repository/index.js';
import { PartnerController } from './partner.controller.js';
import { PartnerService } from './partner.service.js';
import { AdminMiddleware } from '../middlewares/admin.middleware.js';
import { UserRepository } from '../user/_db/repository/index.js';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity]), ImageModule],
  controllers: [PartnerController],
  providers: [PartnerService, PartnerRepository, UserRepository],
})
export class PartnerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes('/partner/create', '/partner/update', '/partner/delete', '/partner/export');
  }
}
