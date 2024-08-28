import { Module } from '@nestjs/common';
import { EducationCenterController } from '../controller/_index.js';
import { EducationCenterService } from '../service/_index.js';

@Module({
  controllers: [EducationCenterController],
  providers: [EducationCenterService],
})
export class EducationalCentersModule {}
