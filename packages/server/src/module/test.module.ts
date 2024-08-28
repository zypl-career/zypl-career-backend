import { Module } from '@nestjs/common';
import { ResultModalController } from '../controller/_index.js';
import { ResultModelService } from '../service/_index.js';

@Module({
  controllers: [ResultModalController],
  providers: [ResultModelService],
})
export class TestModule {}
