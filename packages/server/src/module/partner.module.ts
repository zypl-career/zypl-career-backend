import { Module } from '@nestjs/common';
import { PartnerController } from '../controller/_index.js';
import { PartnerService } from '../service/_index.js';

@Module({
  controllers: [PartnerController],
  providers: [PartnerService],
})
export class PartnerModule {}
