import { Module } from '@nestjs/common';
import { ImageController } from '../controller/_index.js';
import { ImageStorageService } from '../service/_index.js';

@Module({
  controllers: [ImageController],
  providers: [ImageStorageService],
})
export class ImageStorageModule {}
