import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageModule } from '../image/image.module.js';

import { PartnerEntity } from './_db/entity/index.js';
import { PartnerRepository } from './_db/repository/index.js';
import { PartnerController } from './partner.controller.js';
import { PartnerService } from './partner.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity]), ImageModule],
  controllers: [PartnerController],
  providers: [PartnerService, PartnerRepository],
})
export class PartnerModule {}
