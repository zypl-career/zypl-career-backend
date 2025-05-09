import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Express, Response } from 'express';

import { VideoService } from './video.service.js';

@ApiTags('videos')
@Controller('videos')
export class VideoController {
  constructor(private readonly videoStorageService: VideoService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a video file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The video file to upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The CID of the uploaded video',
    schema: {
      type: 'string',
    },
  })
  @ApiResponse({ status: 500, description: 'Error uploading video' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File): Promise<string> {
    try {
      const cid = await this.videoStorageService.uploadVideo(file);
      return cid;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('play/:cid')
  @ApiOperation({ summary: 'Play a video file by CID' })
  @ApiParam({
    name: 'cid',
    type: 'string',
    description: 'The CID of the video file',
  })
  @ApiResponse({
    status: 200,
    description: 'The video file',
    content: {
      'video/mp4': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Video not found' })
  async playVideo(@Param('cid') cid: string, @Res() res: Response): Promise<void> {
    try {
      const videoStream = await this.videoStorageService.getVideo(cid);

      res.set({
        'Content-Type': 'video/mp4',
        'Content-Length': videoStream.length,
      });

      res.end(videoStream);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
