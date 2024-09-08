import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UniversityEntity } from './_db/entity/index.js';
import { UniversityRepository } from './_db/repository/index.js';
import { UniversityController } from './university.controller.js';
import { UniversityService } from './university.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([UniversityEntity])],
  controllers: [UniversityController],
  providers: [UniversityService, UniversityRepository],
})
export class UniversityModule {}
