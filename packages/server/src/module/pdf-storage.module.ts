import { Module } from '@nestjs/common';
import { PdfController } from '../controller/_index.js';
import { PdfService } from '../service/_index.js';

@Module({
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfStorageModule {}
