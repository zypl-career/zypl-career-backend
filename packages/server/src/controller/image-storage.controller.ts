import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { ImageStorageService } from '../service/_index.js';
import { CID } from 'multiformats';
import { imageStorageSwagger } from '../swagger/image.swagger.js';

@ApiTags('images')
@Controller('images')
export class ImageController {
  constructor(private readonly service: ImageStorageService) {}

  // ---------------------------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------------------------
  @Post('upload')
  @HttpCode(201)
  @ApiOperation(imageStorageSwagger.upload.summary)
  @ApiBody(imageStorageSwagger.upload.body)
  @ApiResponse(imageStorageSwagger.upload.responses.success)
  @ApiResponse(imageStorageSwagger.upload.responses.validation)
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
  @ApiOperation(imageStorageSwagger.get.summary)
  @ApiParam(imageStorageSwagger.get.param)
  @ApiResponse(imageStorageSwagger.get.responses.success)
  @ApiResponse(imageStorageSwagger.get.responses.notFound)
  @ApiResponse(imageStorageSwagger.get.responses.badRequest)
  async getImage(@Param('cid') cid: CID, @Res() res: Response) {
    const imageBuffer = await this.service.getImage(cid);
    res.status(HttpStatus.OK).end(imageBuffer);
  }
}
