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

import { IError, IMessage, IValidation } from '../type/index.js';

import { LessonModel } from './_db/model/index.js';
import { CreateLessonDto, GetLessonDto, UpdateLessonDto } from './dto/index.js';
import { lessonSwagger } from './swagger/index.js';
import { LessonService } from './lesson.service.js';

@ApiTags('lesson')
@Controller('/lesson')
export class LessonController {
  constructor(private readonly service: LessonService) {}

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
  @ApiOperation(lessonSwagger.create.summary)
  @ApiBody(lessonSwagger.create.body)
  @ApiResponse(lessonSwagger.create.responses.success)
  @ApiResponse(lessonSwagger.create.responses.validation)
  @ApiResponse(lessonSwagger.create.responses.conflict)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resource'))
  async create(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFile() resource: Express.Multer.File,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.create({ ...createLessonDto, resource });
    return this.handleServiceResult(result);
  }

  @Get('/get/:id')
  @ApiOperation(lessonSwagger.get.summary)
  @ApiParam(lessonSwagger.get.param)
  @ApiResponse(lessonSwagger.get.responses.success)
  @ApiResponse(lessonSwagger.get.responses.notFound)
  @ApiResponse(lessonSwagger.get.responses.badRequest)
  async getLesson(@Param('id') id: string): Promise<IError | IValidation | LessonModel> {
    const result = await this.service.get(id);
    return this.handleServiceResult(result);
  }

  @Get('/get')
  @ApiOperation(lessonSwagger.getAll.summary)
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
    name: 'name',
    required: false,
    description: 'Filter by name (partial match)',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by status',
    type: String,
  })
  @ApiResponse(lessonSwagger.getAll.responses.success)
  @ApiResponse(lessonSwagger.getAll.responses.notFound)
  async getLessons(
    @Query() getLessonsDto: GetLessonDto,
  ): Promise<IError | IValidation | LessonModel[] | LessonModel> {
    const result = await this.service.get(undefined, getLessonsDto);
    return this.handleServiceResult(result);
  }

  @Patch('/update/:id')
  @ApiOperation(lessonSwagger.update.summary)
  @ApiParam(lessonSwagger.update.param)
  @ApiBody(lessonSwagger.update.body)
  @ApiResponse(lessonSwagger.update.responses.success)
  @ApiResponse(lessonSwagger.update.responses.notFound)
  @ApiResponse(lessonSwagger.update.responses.validation)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resource'))
  async updateLesson(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @UploadedFile() resource: Express.Multer.File,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.update(id, {
      ...updateLessonDto,
      resource,
    });
    return this.handleServiceResult(result);
  }

  @Delete('/delete/:id')
  @ApiOperation(lessonSwagger.delete.summary)
  @ApiParam(lessonSwagger.delete.param)
  @ApiResponse(lessonSwagger.delete.responses.success)
  @ApiResponse(lessonSwagger.delete.responses.notFound)
  @ApiResponse(lessonSwagger.delete.responses.validation)
  async deleteLesson(@Param('id') id: string): Promise<IMessage | IError | IValidation> {
    const result = await this.service.delete(id);
    return this.handleServiceResult(result);
  }

  @Post('/submit/:id')
  @ApiOperation(lessonSwagger.submit.summary)
  @ApiParam(lessonSwagger.submit.param)
  @ApiResponse(lessonSwagger.submit.responses.success)
  @ApiResponse(lessonSwagger.submit.responses.notFound)
  async submitLesson(@Param('id') id: string): Promise<IMessage | IError | IValidation> {
    const result = await this.service.submitLesson(id);
    return this.handleServiceResult(result);
  }

  @Get('/by-course/:courseId')
  @ApiOperation(lessonSwagger.getByCourseId.summary)
  @ApiParam(lessonSwagger.getByCourseId.param)
  @ApiResponse(lessonSwagger.getByCourseId.responses.success)
  @ApiResponse(lessonSwagger.getByCourseId.responses.notFound)
  @ApiResponse(lessonSwagger.getByCourseId.responses.badRequest)
  async getLessonsByCourseId(
    @Param('courseId') courseId: string,
  ): Promise<IError | IValidation | LessonModel[]> {
    const result = await this.service.getLessonsByCourseId(courseId);
    return this.handleServiceResult(result);
  }
}
