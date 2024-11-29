import {
  Body,
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

import { EducationCenterModel } from './_db/model/index.js';
import { CreateEducationCenterDto, UpdateEducationCenterDto } from './dto/index.js';
import { educationCenterSwagger } from './swagger/index.js';
import { IEducationCenterGetDataDTO } from './type/index.js';
import { EducationalCenterService } from './educational-center.service.js';
import { Response } from 'express';

@ApiTags('education-center')
@Controller('/education-center')
export class EducationCenterController {
  constructor(private readonly service: EducationalCenterService) {}

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
  @ApiOperation(educationCenterSwagger.create.summary)
  @ApiBody(educationCenterSwagger.create.body)
  @ApiResponse(educationCenterSwagger.create.responses.success)
  @ApiResponse(educationCenterSwagger.create.responses.validation)
  @ApiResponse(educationCenterSwagger.create.responses.conflict)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createDto: CreateEducationCenterDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.create({ ...createDto, image: image });
    return this.handleServiceResult(result);
  }

  @Get('/get/:id')
  @ApiOperation(educationCenterSwagger.get.summary)
  @ApiParam(educationCenterSwagger.get.param)
  @ApiResponse(educationCenterSwagger.get.responses.successId)
  @ApiResponse(educationCenterSwagger.get.responses.notFound)
  @ApiResponse(educationCenterSwagger.get.responses.badRequest)
  async getUniversity(
    @Param('id') id: string,
  ): Promise<IError | IValidation | EducationCenterModel> {
    const result = await this.service.get(id);
    return this.handleServiceResult(result);
  }

  @Get('/get')
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
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Filter by title (partial match)',
    type: String,
  })
  @ApiQuery({
    name: 'city',
    required: false,
    description: 'Filter by city ',
    type: String,
  })
  @ApiOperation(educationCenterSwagger.get.summary)
  @ApiResponse(educationCenterSwagger.get.responses.success)
  @ApiResponse(educationCenterSwagger.get.responses.notFound)
  @ApiResponse(educationCenterSwagger.get.responses.badRequest)
  async getUsers(
    @Query() getEducationCenterDto: IEducationCenterGetDataDTO,
  ): Promise<IError | IValidation | EducationCenterModel[] | EducationCenterModel> {
    const result = await this.service.get(undefined, getEducationCenterDto);
    return this.handleServiceResult(result);
  }

  @Patch('/update/:id')
  @ApiOperation(educationCenterSwagger.update.summary)
  @ApiParam(educationCenterSwagger.update.param)
  @ApiBody(educationCenterSwagger.update.body)
  @ApiResponse(educationCenterSwagger.update.responses.success)
  @ApiResponse(educationCenterSwagger.update.responses.notFound)
  @ApiResponse(educationCenterSwagger.update.responses.validation)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async updateEducationCenter(
    @Param('id') id: string,
    @Body() updateDto: UpdateEducationCenterDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.update(id, { ...updateDto, image });
    return this.handleServiceResult(result);
  }

  @Delete('/delete/:id')
  @ApiOperation(educationCenterSwagger.delete.summary)
  @ApiParam(educationCenterSwagger.delete.param)
  @ApiResponse(educationCenterSwagger.delete.responses.success)
  @ApiResponse(educationCenterSwagger.delete.responses.notFound)
  @ApiResponse(educationCenterSwagger.delete.responses.validation)
  async deleteEducationCenter(@Param('id') id: string): Promise<IMessage | IError | IValidation> {
    const result = await this.service.delete(id);
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
