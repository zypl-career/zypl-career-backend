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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { CoursesService } from '../service/courses.service.js';
import {
  CreateCourseDto,
  GetCoursesDto,
  UpdateCourseDto,
} from '../dto/courses.dto.js';
import { courseSwagger } from '../swagger/courses.swagger.js';
import { IError, IMessage, IValidation } from '../types/_index.js';
import { CoursesModel } from '../_db/model/courses.model.js';

@ApiTags('courses')
@Controller('/courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

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
  async getCourse(
    @Param('id') id: string,
  ): Promise<IError | IValidation | CoursesModel> {
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
  ): Promise<IError | IValidation | CoursesModel[] | CoursesModel> {
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
    const result = await this.service.update(id, updateCourseDto);
    return this.handleServiceResult(result);
  }

  @Delete('/delete/:id')
  @ApiOperation(courseSwagger.delete.summary)
  @ApiParam(courseSwagger.delete.param)
  @ApiResponse(courseSwagger.delete.responses.success)
  @ApiResponse(courseSwagger.delete.responses.notFound)
  @ApiResponse(courseSwagger.delete.responses.validation)
  async deleteCourse(
    @Param('id') id: string,
  ): Promise<IMessage | IError | IValidation> {
    const result = await this.service.delete(id);
    return this.handleServiceResult(result);
  }
}
