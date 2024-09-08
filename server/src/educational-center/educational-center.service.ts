import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { appConfig } from '../app.config.js';
import { ImageService } from '../image/image.service.js';
import { IError, IMessage, IValidation } from '../type/base.js';
import { formatValidationErrors, validateUUID } from '../util/index.js';

import { EducationCenterModel } from './_db/model/index.js';
import { EducationCenterRepository } from './_db/repository/index.js';
import {
  CreateEducationCenterDto,
  GetEducationCenterDto,
  UpdateEducationCenterDto,
} from './dto/index.js';
import {
  IEducationCenterCreateDataDTO,
  IEducationCenterGetDataDTO,
  IEducationCenterUpdateDataDTO,
  PaginatedEducationCenterResponse,
} from './type/index.js';

@Injectable()
export class EducationalCenterService {
  constructor(
    private readonly repository: EducationCenterRepository,
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

  private async findEducationCenterById(id: string): Promise<EducationCenterModel | IError> {
    if (!validateUUID(id)) {
      return { error: 'Invalid education center ID' };
    }
    const center = await this.repository.findOneById(id);
    if (!center) {
      return { error: 'Education center not found' };
    }
    return center;
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
  async create(education: IEducationCenterCreateDataDTO): Promise<IMessage | IValidation | IError> {
    const createArticleDto = plainToInstance(CreateEducationCenterDto, education);
    const validationErrors = await this.validateDto(createArticleDto);
    if (validationErrors) return validationErrors;

    const uploadedImage = await this.imageService.uploadImage(education.image);
    const generalInfoFile = await this.saveGeneralInfoToFile(
      education.generalInfo,
      `education-center_${uuidv4()}.txt`,
    );

    const newCenter = {
      title: education.title,
      image: appConfig.domain + '/image/get/' + uploadedImage,
      generalInfoFile,
      city: education.city,
    };

    const res = await this.repository.save(newCenter);

    const payload = {
      id: res.id,
      title: res.title,
      image: res.image,
      generalInfo: education.generalInfo,
      city: res.city,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      deletedAt: res.deletedAt,
    };

    return { message: 'Education center registered successfully', payload };
  }

  // ---------------------------------------------------------------------------
  // UPDATE
  // ---------------------------------------------------------------------------
  async update(
    id: string,
    education: IEducationCenterUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const centerToUpdate = await this.findEducationCenterById(id);

    if ('error' in centerToUpdate) return centerToUpdate;

    const updateArticleDto = plainToInstance(UpdateEducationCenterDto, education);
    const validationErrors = await this.validateDto(updateArticleDto);
    if (validationErrors) return validationErrors;

    if (education.image) {
      const uploadedImage = await this.imageService.uploadImage(education.image);
      centerToUpdate.image = appConfig.domain + '/image/get/' + uploadedImage;
    }

    if (education.generalInfo) {
      centerToUpdate.generalInfoFile = await this.saveGeneralInfoToFile(
        education.generalInfo,
        `education-center_${id}.txt`,
      );
    }

    if (education.title) centerToUpdate.title = education.title;
    if (education.city) centerToUpdate.city = education.city;

    const res = await this.repository.save(centerToUpdate);

    const payload = {
      id: res.id,
      title: res.title,
      image: res.image,
      generalInfo: education.generalInfo ?? res.generalInfoFile,
      city: res.city,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      deletedAt: res.deletedAt,
    };

    return { message: 'Education center updated successfully', payload };
  }

  // ---------------------------------------------------------------------------
  // GET
  async get(
    id?: string,
    filters?: IEducationCenterGetDataDTO,
  ): Promise<
    | EducationCenterModel
    | EducationCenterModel[]
    | IError
    | IValidation
    | PaginatedEducationCenterResponse
  > {
    if (id) {
      const education = await this.findEducationCenterById(id);
      if ('error' in education) return education;
      const generalInfoContent = await this.readGeneralInfoFromFile(education.generalInfoFile);

      const result = {
        id: education.id,
        title: education.title,
        image: education.image,
        city: education.city,
        generalInfo: generalInfoContent,
        createdAt: education.createdAt,
        updatedAt: education.updatedAt,
        deletedAt: null,
      };

      return result as any;
    }

    let educations: EducationCenterModel[];
    let totalEducationCenter: number;

    if (filters) {
      const getEducationCenterDto = plainToInstance(GetEducationCenterDto, filters);

      const validationErrors = await this.validateDto(getEducationCenterDto);
      if (validationErrors) return validationErrors;
      const { title, city, page, limit } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      educations = await this.repository.findWithFilters({
        title,
        city,
        skip,
        take: limit,
      });

      totalEducationCenter = await this.repository.countWithFilters({
        title,
        city,
      });
    } else {
      educations = await this.repository.find();
      totalEducationCenter = await this.repository.count();
    }
    return {
      total: totalEducationCenter,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: educations,
    };
  }

  // ---------------------------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------------------------
  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const centerToDelete = await this.findEducationCenterById(id);
    if ('error' in centerToDelete) return centerToDelete;

    await this.repository.delete(id);

    return { message: 'Education center deleted successfully' };
  }
}
