import { Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { ImageService } from './image.service.js';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly service: ImageService) {}

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  @Post('upload')
  @ApiOperation({ summary: 'Upload an image file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The image file to upload',
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
    description: 'The filename of the uploaded image',
    schema: {
      type: 'string',
    },
  })
  @ApiResponse({ status: 500, description: 'Error uploading image' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return await this.service.uploadImage(file);
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  @Get('get/:filename')
  @ApiOperation({ summary: 'Get an image file by filename' })
  @ApiResponse({ status: 200, description: 'Image file retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Image file not found' })
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imageBuffer = await this.service.getImage(filename);
    res.status(HttpStatus.OK).end(imageBuffer);
  }
}
