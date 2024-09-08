import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ImageService } from './image.service.js';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly service: ImageService) {}
  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  @Get('get/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imageBuffer = await this.service.getImage(filename);
    res.status(HttpStatus.OK).end(imageBuffer);
  }
}
