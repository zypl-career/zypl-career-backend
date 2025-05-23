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
  Query,
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { IError, IMessage, IValidation } from '../type/base.js';

import { PartnerModel } from './_db/model/index.js';
import { partnerSwagger } from './swagger/index.js';
import { PartnerService } from './partner.service.js';
import { Response } from 'express';

@ApiTags('partner')
@Controller('/partner')
export class PartnerController {
  constructor(private readonly service: PartnerService) {}

  private handleServiceResult(result: any) {
    if ('error' in result) {
      throw new HttpException(result.error, HttpStatus.NOT_FOUND);
    } else if ('validation' in result) {
      throw new HttpException(result.validation, HttpStatus.UNPROCESSABLE_ENTITY);
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
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() image: Express.Multer.File): Promise<IMessage | IValidation> {
    const result = await this.service.create(image);
    return this.handleServiceResult(result);
  }

  @Get('/get/:id')
  @ApiOperation(partnerSwagger.getById.summary)
  @ApiParam(partnerSwagger.getById.param)
  @ApiResponse(partnerSwagger.getById.responses.success)
  @ApiResponse(partnerSwagger.getById.responses.notFound)
  @ApiResponse(partnerSwagger.getById.responses.badRequest)
  async getPartner(@Param('id') id: string): Promise<IError | IValidation | PartnerModel> {
    const result = await this.service.getPartner(id);
    return this.handleServiceResult(result);
  }

  @Get('/get')
  @ApiOperation(partnerSwagger.getAll.summary)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
    example: 10,
  })
  @ApiResponse(partnerSwagger.getAll.responses.success)
  @ApiResponse(partnerSwagger.getAll.responses.notFound)
  async getPartners(
    @Query() query: { page: number; limit: number },
  ): Promise<IError | IValidation | { page: number; limit: number; data: PartnerModel[] }> {
    const result = await this.service.getPaginatedPartners(query.page, query.limit);
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
  async deletePartner(@Param('id') id: string): Promise<IError | IMessage | IValidation> {
    const result = await this.service.deletePartner(id);
    return this.handleServiceResult(result);
  }

  @Get('/export')
  @ApiOperation({ summary: 'Export articles as Excel' })
  @ApiResponse({ status: 200, description: 'Excel file successfully generated' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async exportToExcel(@Res() res: Response): Promise<void> {
    try {
      const buffer = await this.service.exportToExcel();

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=articles.xlsx');
      res.end(buffer);
    } catch (error) {
      throw new HttpException(
        { error: `Failed to generate Excel file: ${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
