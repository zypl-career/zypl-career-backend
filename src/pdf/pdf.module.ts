import { Module } from '@nestjs/common';

import { PdfController } from './pdf.controller.js';
import { PdfService } from './pdf.service.js';

@Module({
  providers: [PdfService],
  exports: [PdfService],
  controllers: [PdfController],
})
export class PdfModule {}
