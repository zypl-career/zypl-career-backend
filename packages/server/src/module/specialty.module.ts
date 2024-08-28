import { Module } from '@nestjs/common';
import { SpecialtyController } from '../controller/_index.js';
import { SpecialtyService } from '../service/_index.js';

@Module({
  controllers: [SpecialtyController],
  providers: [SpecialtyService],
})
export class SpecialtyModule {}
