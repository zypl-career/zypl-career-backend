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

@ApiTags('video')
@Controller('video')
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
    description: 'The filename of the uploaded video',
    schema: {
      type: 'string',
    },
  })
  @ApiResponse({ status: 500, description: 'Error uploading video' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File): Promise<string> {
    try {
      const filename = await this.videoStorageService.uploadVideo(file);
      return filename;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get/:filename')
  @ApiOperation({ summary: 'Get a video file by filename' })
  @ApiParam({
    name: 'filename',
    type: 'string',
    description: 'The filename of the video file',
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
  async getVideo(@Param('filename') filename: string, @Res() res: Response): Promise<void> {
    try {
      const videoBuffer = await this.videoStorageService.getVideo(filename);

      res.set({
        'Content-Type': 'video/mp4',
        'Content-Length': videoBuffer.length,
      });

      res.end(videoBuffer);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
