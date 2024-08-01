import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EducationCenterModel } from '../_db/model/educational-centers.model.js';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { educationCenterSwagger } from '../swagger/educational-centers.swagger.js';
import { IError, IMessage, IValidation } from '../types/_index.js';
import { EducationCenterService } from '../service/educational-centers.service.js';
import {
  CreateEducationCenterDto,
  UpdateEducationCenterDto,
} from '../dto/educational-centers.dto.js';

@ApiTags('education-center')
@Controller('/education-center')
export class EducationCenterController {
  constructor(private readonly service: EducationCenterService) {}

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
    const { title, generalInfo, city } = createDto;
    const result = await this.service.create(title, image, generalInfo, city);
    return this.handleServiceResult(result);
  }

  @Get('/get/:id')
  @ApiOperation(educationCenterSwagger.get.summary)
  @ApiParam(educationCenterSwagger.get.param)
  @ApiResponse(educationCenterSwagger.get.responses.success)
  @ApiResponse(educationCenterSwagger.get.responses.notFound)
  @ApiResponse(educationCenterSwagger.get.responses.badRequest)
  async getEducationCenter(
    @Param('id') id: string,
  ): Promise<IError | IValidation | EducationCenterModel> {
    const result = await this.service.get(id);
    return this.handleServiceResult(result);
  }

  @Get('/get')
  @ApiOperation(educationCenterSwagger.getAll.summary)
  @ApiQuery(educationCenterSwagger.getAll.query)
  @ApiResponse(educationCenterSwagger.getAll.responses.success)
  @ApiResponse(educationCenterSwagger.getAll.responses.notFound)
  async getEducationCenters(
    @Query('city') city?: string,
  ): Promise<
    IError | IValidation | EducationCenterModel[] | EducationCenterModel
  > {
    const result = await this.service.get(undefined, city);
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
    const { title, generalInfo, city } = updateDto;
    const result = await this.service.update(
      id,
      title,
      image,
      generalInfo,
      city,
    );
    return this.handleServiceResult(result);
  }

  @Delete('/delete/:id')
  @ApiOperation(educationCenterSwagger.delete.summary)
  @ApiParam(educationCenterSwagger.delete.param)
  @ApiResponse(educationCenterSwagger.delete.responses.success)
  @ApiResponse(educationCenterSwagger.delete.responses.notFound)
  @ApiResponse(educationCenterSwagger.delete.responses.validation)
  async deleteEducationCenter(
    @Param('id') id: string,
  ): Promise<IMessage | IError | IValidation> {
    const result = await this.service.delete(id);
    return this.handleServiceResult(result);
  }
}
