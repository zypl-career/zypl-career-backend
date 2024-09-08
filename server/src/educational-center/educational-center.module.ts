import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageModule } from '../image/image.module.js';

import { EducationCenterEntity } from './_db/entity/index.js';
import { EducationCenterRepository } from './_db/repository/index.js';
import { EducationCenterController } from './educational-center.controller.js';
import { EducationalCenterService } from './educational-center.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([EducationCenterEntity]), ImageModule],
  controllers: [EducationCenterController],
  providers: [EducationalCenterService, EducationCenterRepository],
})
export class EducationalCentersModule {}
