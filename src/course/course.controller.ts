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

import { IError, IMessage, IValidation } from '../type/base.js';

import { CourseModel } from './_db/model/index.js';
import { CreateCourseDto } from './dto/create.js';
import { GetCoursesDto } from './dto/get.js';
import { UpdateCourseDto } from './dto/update.js';
import { courseSwagger } from './swagger/index.js';
import { CourseService } from './course.service.js';

@ApiTags('course')
@Controller('/course')
export class CourseController {
  constructor(private readonly service: CourseService) {}

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
  @ApiOperation(courseSwagger.create.summary)
  @ApiBody(courseSwagger.create.body)
  @ApiResponse(courseSwagger.create.responses.success)
  @ApiResponse(courseSwagger.create.responses.validation)
  @ApiResponse(courseSwagger.create.responses.conflict)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.create({ ...createCourseDto, image });
    return this.handleServiceResult(result);
  }

  @Get('/get/:id')
  @ApiOperation(courseSwagger.get.summary)
  @ApiParam(courseSwagger.get.param)
  @ApiResponse(courseSwagger.get.responses.success)
  @ApiResponse(courseSwagger.get.responses.notFound)
  @ApiResponse(courseSwagger.get.responses.badRequest)
  async getCourse(@Param('id') id: string): Promise<IError | IValidation | CourseModel> {
    const result = await this.service.get(id);
    return this.handleServiceResult(result);
  }

  @Get('/get')
  @ApiOperation(courseSwagger.getAll.summary)
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
    name: 'description',
    required: false,
    description: 'Filter by description (partial match)',
    type: String,
  })
  @ApiQuery({
    name: 'finishedPercentage',
    required: false,
    description: 'Filter by finished percentage',
    type: Number,
  })
  @ApiQuery({
    name: 'tags',
    required: false,
    description: 'Filter by tags',
    type: String,
    isArray: true,
  })
  @ApiResponse(courseSwagger.getAll.responses.success)
  @ApiResponse(courseSwagger.getAll.responses.notFound)
  async getCourses(
    @Query() getCoursesDto: GetCoursesDto,
  ): Promise<IError | IValidation | CourseModel[] | CourseModel> {
    const result = await this.service.get(undefined, getCoursesDto);
    return this.handleServiceResult(result);
  }

  @Patch('/update/:id')
  @ApiOperation(courseSwagger.update.summary)
  @ApiParam(courseSwagger.update.param)
  @ApiBody(courseSwagger.update.body)
  @ApiResponse(courseSwagger.update.responses.success)
  @ApiResponse(courseSwagger.update.responses.notFound)
  @ApiResponse(courseSwagger.update.responses.validation)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.update(id, { ...updateCourseDto, image: image });
    return this.handleServiceResult(result);
  }

  @Delete('/delete/:id')
  @ApiOperation(courseSwagger.delete.summary)
  @ApiParam(courseSwagger.delete.param)
  @ApiResponse(courseSwagger.delete.responses.success)
  @ApiResponse(courseSwagger.delete.responses.notFound)
  @ApiResponse(courseSwagger.delete.responses.validation)
  async deleteCourse(@Param('id') id: string): Promise<IMessage | IError | IValidation> {
    const result = await this.service.delete(id);
    return this.handleServiceResult(result);
  }
}
