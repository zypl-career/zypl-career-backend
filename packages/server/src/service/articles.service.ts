import { Injectable } from '@nestjs/common';
import { isArray, validate } from 'class-validator';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ImageStorageService } from './image-storage.service.js';
import { Config } from '../app/config.app.js';
import { ArticlesRepository } from '../_db/repository/articles.repository.js';
import { ArticlesModel } from '../_db/model/articles.model.js';
import { IError, IMessage, IValidation } from '../types/_index.js';
import { formatValidationErrors, validateUUID } from '../util/utils.js';
import { CreateArticleDto, UpdateArticleDto } from '../dto/articles.dto.js';
import { UpdateUserDto } from '../dto/user.dto.js';

@Injectable()
export class ArticlesService {
  #repository = ArticlesRepository;
  #mediaPath = 'media/articles-info';
  #imageService = new ImageStorageService();

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

  private async findArticleById(id: string): Promise<ArticlesModel | IError> {
    if (!validateUUID(id)) {
      return { error: 'Invalid article ID' };
    }
    const article = await this.#repository.findOneById(id);
    if (!article) {
      return { error: 'Article not found' };
    }
    return article;
  }

  private async saveGeneralInfoToFile(
    content: string,
    filename: string,
  ): Promise<string> {
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
  async create(
    createArticleDto: CreateArticleDto,
  ): Promise<IMessage | IValidation | IError> {
    const arrayHashtags = isArray(createArticleDto.hashtags)
      ? createArticleDto.hashtags
      : (createArticleDto.hashtags as string).split(', ');
    const validationErrors = await this.validateDto({
      createArticleDto,
      hashtags: arrayHashtags,
    });
    if (validationErrors) return validationErrors;

    const { title, description, image, minutesRead, generalInfo, hashtags } =
      createArticleDto;

    const uploadedImage = await this.#imageService.uploadImage(image);
    const generalInfoFile = await this.saveGeneralInfoToFile(
      generalInfo,
      `article_${uuidv4()}.txt`,
    );

    const newArticle = {
      title,
      description,
      image: Config.domain + '/images/get/' + uploadedImage,
      minutesRead,
      generalInfoFile,
      hashtags: arrayHashtags,
    };

    await this.#repository.save(newArticle);

    return { message: 'Article created successfully' };
  }

  // ---------------------------------------------------------------------------
  // UPDATE
  // ---------------------------------------------------------------------------
  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<IMessage | IValidation | IError> {
    const arrayHashtags = updateArticleDto.hashtags
      ? isArray(updateArticleDto.hashtags)
        ? updateArticleDto.hashtags
        : (updateArticleDto.hashtags as string).split(',')
      : null;

    updateArticleDto = {
      ...updateArticleDto,
      hashtags: arrayHashtags ?? updateArticleDto.hashtags ?? undefined,
    };

    const validationErrors = await this.validateDto(updateArticleDto);

    if (validationErrors) return validationErrors;

    const articleToUpdate = await this.findArticleById(id);

    if ('error' in articleToUpdate) return articleToUpdate;

    const { title, description, image, minutesRead, generalInfo, hashtags } =
      updateArticleDto;

    if (image) {
      const uploadedImage = await this.#imageService.uploadImage(image);
      articleToUpdate.image = Config.domain + '/images/get/' + uploadedImage;
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
      articleToUpdate.hashtags = isArray(hashtags)
        ? hashtags
        : (hashtags as string).split(',');

    await this.#repository.save(articleToUpdate);

    return { message: 'Article updated successfully' };
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async get(
    id?: string,
    hashtags?: string[] | string,
  ): Promise<ArticlesModel | ArticlesModel[] | IError | IValidation> {
    if (id) {
      const article = await this.findArticleById(id);
      if ('error' in article) return article;

      const generalInfoContent = await this.readGeneralInfoFromFile(
        article.generalInfoFile,
      );
      return { ...article, generalInfoFile: generalInfoContent };
    }

    if (hashtags) {
      const articles = await this.#repository.findByHashtags(hashtags);
      const articlesWithInfo = await Promise.all(
        articles.map(async (article) => {
          const generalInfoContent = await this.readGeneralInfoFromFile(
            article.generalInfoFile,
          );
          return { ...article, generalInfoFile: generalInfoContent };
        }),
      );
      return articlesWithInfo;
    }

    const articles = await this.#repository.find();
    const articlesWithInfo = await Promise.all(
      articles.map(async (article) => {
        const generalInfoContent = await this.readGeneralInfoFromFile(
          article.generalInfoFile,
        );
        return { ...article, generalInfoFile: generalInfoContent };
      }),
    );

    return articlesWithInfo;
  }

  // ---------------------------------------------------------------------------
  // GET DISTINCT HASHTAGS
  // ---------------------------------------------------------------------------
  async getAllHashtags(): Promise<string[] | IError> {
    try {
      const hashtags = await this.#repository.getDistinctHashtags();
      return hashtags;
    } catch (error) {
      return { error: 'Failed to retrieve hashtags' };
    }
  }

  // ---------------------------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------------------------
  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const articleToDelete = await this.findArticleById(id);
    if ('error' in articleToDelete) return articleToDelete;

    await this.#repository.delete(id);

    return { message: 'Article deleted successfully' };
  }
}
