import { Module } from '@nestjs/common';
import { UniversityController } from '../controller/_index.js';
import { UniversityService } from '../service/_index.js';

@Module({
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
