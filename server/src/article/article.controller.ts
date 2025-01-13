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

import { IError, IMessage, IValidation } from '../type/index.js';

import { ArticleModel } from './_db/model/index.js';
import { CreateArticleDto, GetArticlesDto, UpdateArticleDto } from './dto/index.js';
import { articleSwagger } from './swagger/index.js';
import { ArticleService } from './article.service.js';
import { Response } from 'express';

@ApiTags('article')
@Controller('/article')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

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
  async getArticle(@Param('id') id: string): Promise<IError | IValidation | ArticleModel> {
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
  ): Promise<IError | IValidation | ArticleModel[] | ArticleModel> {
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
        { error: `Failed to retrieve hashtags: // ${error} //` },
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
    const result = await this.service.update(id, { ...updateArticleDto, image: image });
    return this.handleServiceResult(result);
  }

  @Delete('/delete/:id')
  @ApiOperation(articleSwagger.delete.summary)
  @ApiParam(articleSwagger.delete.param)
  @ApiResponse(articleSwagger.delete.responses.success)
  @ApiResponse(articleSwagger.delete.responses.notFound)
  @ApiResponse(articleSwagger.delete.responses.validation)
  async deleteArticle(@Param('id') id: string): Promise<IMessage | IError | IValidation> {
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
