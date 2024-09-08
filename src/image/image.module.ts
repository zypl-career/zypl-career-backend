import { Module } from '@nestjs/common';

import { ImageController } from './image.controller.js';
import { ImageService } from './image.service.js';

@Module({
  providers: [ImageService],
  exports: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
