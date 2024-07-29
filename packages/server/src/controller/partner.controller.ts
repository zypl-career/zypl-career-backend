import { PartnerService } from '../service/partner.service.js';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { PartnerModel } from '../_db/model/partner.model.js';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { partnerSwagger } from '../swagger/partner.swagger.js';
import { IError, IMessage, IValidation } from '../types/_index.js';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('partner')
@Controller('/partner')
export class PartnerController {
  constructor(private readonly service: PartnerService) {}

  private handleServiceResult(result: any) {
    if ('error' in result) {
      throw new HttpException(result.error, HttpStatus.NOT_FOUND);
    } else if ('validation' in result) {
      throw new HttpException(
        result.validation,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return result;
  }

  @Post('/create')
  @HttpCode(201)
  @ApiOperation(partnerSwagger.create.summary)
  @ApiBody(partnerSwagger.create.body)
  @ApiResponse(partnerSwagger.create.responses.success)
  @ApiResponse(partnerSwagger.create.responses.conflict)
  @ApiResponse(partnerSwagger.create.responses.validation)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.create(file);
    return this.handleServiceResult(result);
  }

  @Get(['/get/:id', '/get'])
  @ApiOperation(partnerSwagger.get.summary)
  @ApiParam(partnerSwagger.get.param)
  @ApiResponse(partnerSwagger.get.responses.success)
  @ApiResponse(partnerSwagger.get.responses.notFound)
  @ApiResponse(partnerSwagger.get.responses.badRequest)
  async getPartner(
    @Param('id') id?: string,
  ): Promise<IError | IValidation | PartnerModel | PartnerModel[]> {
    const result = await this.service.getPartner(id);
    return this.handleServiceResult(result);
  }

  @Patch('/update/:id')
  @ApiOperation(partnerSwagger.update.summary)
  @ApiParam(partnerSwagger.update.param)
  @ApiBody(partnerSwagger.update.body)
  @ApiResponse(partnerSwagger.update.responses.success)
  @ApiResponse(partnerSwagger.update.responses.notFound)
  @ApiResponse(partnerSwagger.update.responses.validation)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async updatePartner(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.updatePartner(id, file);
    return this.handleServiceResult(result);
  }

  @Delete('/delete/:id')
  @ApiOperation(partnerSwagger.delete.summary)
  @ApiParam(partnerSwagger.delete.param)
  @ApiResponse(partnerSwagger.delete.responses.success)
  @ApiResponse(partnerSwagger.delete.responses.notFound)
  @ApiResponse(partnerSwagger.delete.responses.validation)
  async deletePartner(
    @Param('id') id: string,
  ): Promise<IError | IMessage | IValidation> {
    const result = await this.service.deletePartner(id);
    return this.handleServiceResult(result);
  }
}
