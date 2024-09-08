import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { IConflict, IError, IMessage, IValidation } from '../type/index.js';
import { formatValidationErrors, validateUUID } from '../util/index.js';

import { UniversityModel } from './_db/model/index.js';
import { UniversityRepository } from './_db/repository/index.js';
import { CreateUniversityDto, getUniversityDTO, UpdateUniversityDto } from './dto/index.js';
import {
  IUniversityCreateDataDTO,
  IUniversityGetDataDTO,
  IUniversityUpdateDataDTO,
  PaginatedUniversityResponse,
} from './type/index.js';

@Injectable()
export class UniversityService {
  constructor(private readonly repository: UniversityRepository) {}
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

  private async findUniversityById(id: string): Promise<UniversityModel | IError> {
    if (!validateUUID(id)) {
      return { error: 'Invalid university ID' };
    }
    const university = await this.repository.findOneById(id);
    if (!university) {
      return { error: 'University not found' };
    }
    return university;
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
  async create(
    university: IUniversityCreateDataDTO,
  ): Promise<IMessage | IValidation | IError | IConflict> {
    const createUniversityDto = plainToInstance(CreateUniversityDto, university);
    const validationErrors = await this.validateDto(createUniversityDto);
    if (validationErrors) return validationErrors;

    const existingUniversity = await this.repository.findOneBy({
      name: university.name,
    });

    if (existingUniversity) {
      return { conflict: 'University already exists' };
    }

    const universityId = uuidv4();
    const generalInfoFile = await this.saveGeneralInfoToFile(
      university.generalInfo,
      `university_${universityId}.txt`,
    );

    const newUniversity = {
      ...university,
      id: universityId,
      generalInfoFile,
    };

    const saveUniversity = await this.repository.save(newUniversity);

    const payload = {
      id: saveUniversity.id,
      name: saveUniversity.name,
      city: saveUniversity.city,
      generalInfo: university.generalInfo,
      createdAt: saveUniversity.createdAt,
      updatedAt: saveUniversity.updatedAt,
      deletedAt: saveUniversity.deletedAt,
    };

    return {
      message: 'University registered successfully',
      payload,
    };
  }

  // ---------------------------------------------------------------------------
  // UNIVERSITY UPDATE
  // ---------------------------------------------------------------------------
  async update(
    id: string,
    university: IUniversityUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const updateUniversityDto = plainToInstance(UpdateUniversityDto, university);
    const validationErrors = await this.validateDto(updateUniversityDto);
    if (validationErrors) return validationErrors;

    const universityToUpdate = await this.findUniversityById(id);

    if ('error' in universityToUpdate) return universityToUpdate;

    if (university.generalInfo) {
      universityToUpdate.generalInfoFile = await this.saveGeneralInfoToFile(
        university.generalInfo,
        `university_${id}.txt`,
      );
    }

    Object.assign(universityToUpdate, university);

    await this.repository.save(universityToUpdate);

    return { message: 'University updated successfully' };
  }

  // ---------------------------------------------------------------------------
  // UNIVERSITY GET
  // ---------------------------------------------------------------------------
  async get(
    id?: string,
    filters?: IUniversityGetDataDTO,
  ): Promise<
    UniversityModel | UniversityModel[] | IError | IValidation | PaginatedUniversityResponse
  > {
    if (id) {
      const university = await this.findUniversityById(id);
      if ('error' in university) return university;
      const generalInfoContent = await this.readGeneralInfoFromFile(university.generalInfoFile);

      const result = {
        id: university.id,
        name: university.name,
        city: university.city,
        generalInfo: generalInfoContent,
        createdAt: university.createdAt,
        updatedAt: university.updatedAt,
        deletedAt: null,
      };

      return result as any;
    }

    let universities: UniversityModel[];
    let totalUsers: number;

    if (filters) {
      const createUserDto = plainToInstance(getUniversityDTO, filters);
      const validationErrors = await this.validateDto(createUserDto);
      if (validationErrors) return validationErrors;
      const { name, city, page, limit } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      universities = await this.repository.findWithFilters({
        name,
        city,
        skip,
        take: limit,
      });

      totalUsers = await this.repository.countWithFilters({
        name,
        city,
      });
    } else {
      universities = await this.repository.find();
      totalUsers = await this.repository.count();
    }
    return {
      total: totalUsers,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: universities,
    };
  }

  // ---------------------------------------------------------------------------
  // UNIVERSITY DELETE
  // ---------------------------------------------------------------------------
  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const universityToDelete = await this.findUniversityById(id);
    if ('error' in universityToDelete) return universityToDelete;

    await this.repository.delete(id);

    return { message: 'University deleted successfully' };
  }
}
