import { Module } from '@nestjs/common';
import { VideoController } from '../controller/_index.js';
import { VideoStorageIPFSService } from '../service/_index.js';

@Module({
  controllers: [VideoController],
  providers: [VideoStorageIPFSService],
})
export class VideoModule {}
