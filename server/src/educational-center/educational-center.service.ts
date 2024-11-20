import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { appConfig } from '../app.config.js';
import { ImageService } from '../image/image.service.js';
import { TxtService } from '../txt/txt.service.js';
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
  IEducationCenterUpdateDataDTO,
  PaginatedEducationCenterResponse,
} from './type/index.js';

@Injectable()
export class EducationalCenterService {
  constructor(
    private readonly repository: EducationCenterRepository,
    private readonly imageService: ImageService,
    private readonly txtService: TxtService,
  ) {}

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

  // ---------------------------------------------------------------------------
  // CREATE
  // ---------------------------------------------------------------------------
  async create(education: IEducationCenterCreateDataDTO): Promise<IMessage | IValidation | IError> {
    const createDto = plainToInstance(CreateEducationCenterDto, education);
    const validationErrors = await this.validateDto(createDto);
    if (validationErrors) return validationErrors;

    const uploadedImage = await this.imageService.uploadImage(education.image);
    const generalInfoFile =
      appConfig.domain + '/txt/' + (await this.txtService.uploadTxt(education.generalInfo));

    const newCenter = {
      title: education.title,
      image: appConfig.domain + '/image/get/' + uploadedImage,
      generalInfoFile,
      city: education.city,
    };

    const result = await this.repository.save(newCenter);

    return { message: 'Education center created successfully', payload: result };
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

    const updateDto = plainToInstance(UpdateEducationCenterDto, education);
    const validationErrors = await this.validateDto(updateDto);
    if (validationErrors) return validationErrors;

    if (education.image) {
      const uploadedImage = await this.imageService.uploadImage(education.image);
      centerToUpdate.image = appConfig.domain + '/image/get/' + uploadedImage;
    }

    if (education.generalInfo) {
      centerToUpdate.generalInfoFile =
        appConfig.domain + '/txt/' + (await this.txtService.uploadTxt(education.generalInfo));
    }

    if (education.title) centerToUpdate.title = education.title;
    if (education.city) centerToUpdate.city = education.city;

    const result = await this.repository.save(centerToUpdate);

    return { message: 'Education center updated successfully', payload: result };
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async get(
    id?: string,
    filters?: GetEducationCenterDto,
  ): Promise<
    | EducationCenterModel
    | EducationCenterModel[]
    | IError
    | IValidation
    | PaginatedEducationCenterResponse
  > {
    if (id) {
      const center = await this.findEducationCenterById(id);
      if ('error' in center) return center;

      const filename = center.generalInfoFile.split('/').pop();
      const generalInfo = await this.txtService.getTxt(filename);
      return { ...center, generalInfo: generalInfo } as any;
    }

    let centers: EducationCenterModel[];
    let totalCenters: number;

    if (filters) {
      const getDto = plainToInstance(GetEducationCenterDto, filters);
      const validationErrors = await this.validateDto(getDto);
      if (validationErrors) return validationErrors;

      const { title, city, page, limit } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      centers = await this.repository.findWithFilters({ title, city, skip, take: limit });
      totalCenters = await this.repository.countWithFilters({ title, city });
    } else {
      centers = await this.repository.find();
      totalCenters = await this.repository.count();
    }

    return {
      total: totalCenters,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: centers,
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
