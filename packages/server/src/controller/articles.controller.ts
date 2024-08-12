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
import { ArticlesModel } from '../_db/model/articles.model.js';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { articleSwagger } from '../swagger/articles.swagger.js';
import { IError, IMessage, IValidation } from '../types/_index.js';
import { ArticlesService } from '../service/articles.service.js';
import {
  CreateArticleDto,
  GetArticlesDto,
  UpdateArticleDto,
} from '../dto/articles.dto.js';

@ApiTags('article')
@Controller('/article')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

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
  @ApiOperation(articleSwagger.create.summary)
  @ApiBody(articleSwagger.create.body)
  @ApiResponse(articleSwagger.create.responses.success)
  @ApiResponse(articleSwagger.create.responses.validation)
  @ApiResponse(articleSwagger.create.responses.conflict)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.create({ ...createArticleDto, image });
    return this.handleServiceResult(result);
  }

  @Get('/get/:id')
  @ApiOperation(articleSwagger.get.summary)
  @ApiParam(articleSwagger.get.param)
  @ApiResponse(articleSwagger.get.responses.success)
  @ApiResponse(articleSwagger.get.responses.notFound)
  @ApiResponse(articleSwagger.get.responses.badRequest)
  async getArticle(
    @Param('id') id: string,
  ): Promise<IError | IValidation | ArticlesModel> {
    const result = await this.service.get(id);
    return this.handleServiceResult(result);
  }
  @Get('/get')
  @ApiOperation(articleSwagger.getAll.summary)
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
    name: 'minutesRead',
    required: false,
    description: 'Filter by minutes to read',
    type: Number,
  })
  @ApiQuery({
    name: 'generalInfo',
    required: false,
    description: 'Filter by general information (partial match)',
    type: String,
  })
  @ApiQuery({
    name: 'hashtags',
    required: false,
    description: 'Filter by hashtags',
    type: String,
    isArray: true,
  })
  @ApiResponse(articleSwagger.getAll.responses.success)
  @ApiResponse(articleSwagger.getAll.responses.notFound)
  async getArticles(
    @Query() getArticlesDto: GetArticlesDto,
  ): Promise<IError | IValidation | ArticlesModel[] | ArticlesModel> {
    const result = await this.service.get(undefined, getArticlesDto);
    return this.handleServiceResult(result);
  }

  @Get('/hashtags')
  @ApiOperation(articleSwagger.getAllHashtags.summary)
  @ApiResponse(articleSwagger.getAllHashtags.responses.success)
  @ApiResponse(articleSwagger.getAllHashtags.responses.error)
  async getAllHashtags(): Promise<string[] | { error: string }> {
    try {
      const hashtags = await this.service.getAllHashtags();
      return hashtags;
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to retrieve hashtags' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/update/:id')
  @ApiOperation(articleSwagger.update.summary)
  @ApiParam(articleSwagger.update.param)
  @ApiBody(articleSwagger.update.body)
  @ApiResponse(articleSwagger.update.responses.success)
  @ApiResponse(articleSwagger.update.responses.notFound)
  @ApiResponse(articleSwagger.update.responses.validation)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.update(id, updateArticleDto);
    return this.handleServiceResult(result);
  }

  @Delete('/delete/:id')
  @ApiOperation(articleSwagger.delete.summary)
  @ApiParam(articleSwagger.delete.param)
  @ApiResponse(articleSwagger.delete.responses.success)
  @ApiResponse(articleSwagger.delete.responses.notFound)
  @ApiResponse(articleSwagger.delete.responses.validation)
  async deleteArticle(
    @Param('id') id: string,
  ): Promise<IMessage | IError | IValidation> {
    const result = await this.service.delete(id);
    return this.handleServiceResult(result);
  }
}
