import { Module } from '@nestjs/common';

import { VideoController } from './video.controller.js';
import { VideoService } from './video.service.js';

@Module({
  providers: [VideoService],
  exports: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
