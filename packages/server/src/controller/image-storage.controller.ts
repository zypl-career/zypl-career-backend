import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { ImageStorageService } from '../service/_index.js';
import { CID } from 'multiformats';

@Controller('images')
export class ImageController {
  constructor(private readonly service: ImageStorageService) {}
  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ cid: CID }> {
    const cid = await this.service.uploadImage(file);
    return { cid };
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  @Get('get/:cid')
  async getImage(@Param('cid') cid: CID, @Res() res: Response) {
    const imageBuffer = await this.service.getImage(cid);
    res.status(HttpStatus.OK).end(imageBuffer);
  }
}
