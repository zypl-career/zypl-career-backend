import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecialtyEntity } from './_db/entity/index.js';
import { SpecialtyRepository } from './_db/repository/index.js';
import { SpecialtyController } from './specialty.controller.js';
import { SpecialtyService } from './specialty.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialtyEntity])],
  controllers: [SpecialtyController],
  providers: [SpecialtyService, SpecialtyRepository],
})
export class SpecialtyModule {}
