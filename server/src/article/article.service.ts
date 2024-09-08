import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { isArray, validate } from 'class-validator';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { appConfig } from '../app.config.js';
import { ImageService } from '../image/image.service.js';
import { IError, IMessage, IValidation } from '../type/base.js';
import { formatValidationErrors, validateUUID } from '../util/index.js';

import { ArticleModel } from './_db/model/index.js';
import { ArticleRepository } from './_db/repository/index.js';
import { CreateArticleDto, GetArticlesDto, UpdateArticleDto } from './dto/index.js';
import {
  IArticleCreateDataDTO,
  IArticleUpdateDataDTO,
  PaginatedArticlesResponse,
} from './type/index.js';

@Injectable()
export class ArticleService {
  constructor(
    private readonly repository: ArticleRepository,
    private readonly imageService: ImageService,
  ) {}

  #mediaPath = 'media';

  // ---------------------------------------------------------------------------
  // PRIVATE FUNCTIONS
  // ---------------------------------------------------------------------------
  private async validateDto(dto: any): Promise<IValidation | null> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      return { validation: formatValidationErrors(errors) };
    }
    return null;
  }

  private async findArticleById(id: string): Promise<ArticleModel | IError> {
    if (!validateUUID(id)) {
      return { error: 'Invalid article ID' };
    }
    const article = await this.repository.findOneById(id);
    if (!article) {
      return { error: 'Article not found' };
    }
    return article;
  }

  private async saveGeneralInfoToFile(content: string, filename: string): Promise<string> {
    const filePath = join(this.#mediaPath, filename);
    await fs.mkdir(this.#mediaPath, { recursive: true });
    await fs.writeFile(filePath, content);
    return filePath;
  }

  private async readGeneralInfoFromFile(filePath: string): Promise<string> {
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  }

  // ---------------------------------------------------------------------------
  // CREATE
  // ---------------------------------------------------------------------------
  async create(article: IArticleCreateDataDTO): Promise<IMessage | IValidation | IError> {
    const arrayHashtags = isArray(article.hashtags)
      ? article.hashtags
      : (article.hashtags as string).split(', ');

    const createArticleDto = plainToInstance(CreateArticleDto, article);
    const validationErrors = await this.validateDto(createArticleDto);
    if (validationErrors) return validationErrors;

    const { title, description, image, minutesRead, generalInfo } = article;

    const uploadedImage = await this.imageService.uploadImage(image);
    const generalInfoFile = await this.saveGeneralInfoToFile(
      generalInfo,
      `article_${uuidv4()}.txt`,
    );

    const newArticle = {
      title,
      description,
      image: appConfig.domain + '/image/get/' + uploadedImage,
      minutesRead,
      generalInfoFile,
      hashtags: arrayHashtags,
    };

    const result = await this.repository.save(newArticle);

    return { message: 'Article created successfully', payload: result };
  }

  // ---------------------------------------------------------------------------
  // UPDATE
  // ---------------------------------------------------------------------------
  async update(
    id: string,
    updateArticle: IArticleUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const arrayHashtags = updateArticle.hashtags
      ? isArray(updateArticle.hashtags)
        ? updateArticle.hashtags
        : (updateArticle.hashtags as string).split(',')
      : null;

    updateArticle = {
      ...updateArticle,
      hashtags: arrayHashtags ?? updateArticle.hashtags ?? undefined,
    };
    const updateArticleDto = plainToInstance(UpdateArticleDto, updateArticle);
    const validationErrors = await this.validateDto(updateArticleDto);
    if (validationErrors) return validationErrors;

    const articleToUpdate = await this.findArticleById(id);

    if ('error' in articleToUpdate) return articleToUpdate;

    const { title, description, image, minutesRead, generalInfo, hashtags } = updateArticle;

    if (image) {
      const uploadedImage = await this.imageService.uploadImage(image);
      articleToUpdate.image = appConfig.domain + '/image/get/' + uploadedImage;
    }

    if (generalInfo) {
      articleToUpdate.generalInfoFile = await this.saveGeneralInfoToFile(
        generalInfo,
        `article_${id}.txt`,
      );
    }

    if (title) articleToUpdate.title = title;
    if (description) articleToUpdate.description = description;
    if (minutesRead !== undefined) articleToUpdate.minutesRead = minutesRead;
    if (hashtags)
      articleToUpdate.hashtags = isArray(hashtags) ? hashtags : (hashtags as string).split(',');

    const result = await this.repository.save(articleToUpdate);

    return { message: 'Article updated successfully', payload: result };
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async get(
    id?: string,
    filters?: GetArticlesDto,
  ): Promise<ArticleModel | ArticleModel[] | IError | IValidation | PaginatedArticlesResponse> {
    if (id) {
      const article = await this.findArticleById(id);
      if ('error' in article) return article;

      const generalInfoContent = await this.readGeneralInfoFromFile(article.generalInfoFile);
      return { ...article, generalInfoFile: generalInfoContent };
    }

    let articles: ArticleModel[];
    let totalArticles: number;

    if (filters) {
      const { title, description, minutesRead, generalInfo, hashtags, page, limit } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      articles = await this.repository.findWithFilters({
        title,
        description,
        minutesRead,
        generalInfo,
        hashtags,
        skip,
        take: limit,
      });
      totalArticles = await this.repository.countWithFilters({
        title,
        description,
        minutesRead,
        generalInfo,
        hashtags,
      });
    } else {
      articles = await this.repository.find();
      totalArticles = await this.repository.count();
    }

    const articlesWithInfo = await Promise.all(
      articles.map(async (article) => {
        const generalInfoContent = await this.readGeneralInfoFromFile(article.generalInfoFile);
        return { ...article, generalInfoFile: generalInfoContent };
      }),
    );

    return {
      total: totalArticles,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: articlesWithInfo,
    };
  }
  // ---------------------------------------------------------------------------
  // GET DISTINCT HASHTAGS
  // ---------------------------------------------------------------------------
  async getAllHashtags(): Promise<string[] | IError> {
    try {
      const hashtags = await this.repository.getDistinctHashtags();
      return hashtags;
    } catch (error) {
      return { error: `Failed to retrieve hashtags: // ${error} //` };
    }
  }

  // ---------------------------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------------------------
  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const articleToDelete = await this.findArticleById(id);
    if ('error' in articleToDelete) return articleToDelete;

    await this.repository.delete(id);

    return { message: 'Article deleted successfully' };
  }
}