import { Injectable } from '@nestjs/common';
import { UniversityRepository } from '../_db/repository/university.repository.js';
import {
  IUniversityCreateDataDTO,
  IUniversityUpdateDataDTO,
} from '../types/university.js';
import { formatValidationErrors, validateUUID } from '../util/utils.js';
import { plainToInstance } from 'class-transformer';
import {
  CreateUniversityDto,
  UpdateUniversityDto,
} from '../dto/university.dto.js';
import { validate } from 'class-validator';
import { UniversityModel } from '../_db/model/university.model.js';
import { IError, IMessage, IValidation } from '../types/_index.js';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UniversityService {
  #repository = UniversityRepository;
  #mediaPath = 'media/university-info';

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

  private async findUniversityById(
    id: string,
  ): Promise<UniversityModel | IError> {
    if (!validateUUID(id)) {
      return { error: 'Invalid university ID' };
    }
    const university = await this.#repository.findOneById(id);
    if (!university) {
      return { error: 'University not found' };
    }
    return university;
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
    university: IUniversityCreateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const createUniversityDto = plainToInstance(
      CreateUniversityDto,
      university,
    );
    const validationErrors = await this.validateDto(createUniversityDto);
    if (validationErrors) return validationErrors;

    const existingUniversity = await this.#repository.findOneBy({
      name: university.name,
    });

    if (existingUniversity) {
      return { error: 'University already exists' };
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

    await this.#repository.save(newUniversity);

    return { message: 'University registered successfully' };
  }

  // ---------------------------------------------------------------------------
  // UNIVERSITY UPDATE
  // ---------------------------------------------------------------------------
  async update(
    id: string,
    university: IUniversityUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const updateUniversityDto = plainToInstance(
      UpdateUniversityDto,
      university,
    );
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

    await this.#repository.save(universityToUpdate);

    return { message: 'University updated successfully' };
  }

  // ---------------------------------------------------------------------------
  // UNIVERSITY GET
  // ---------------------------------------------------------------------------
  async get(
    id?: string,
  ): Promise<UniversityModel | UniversityModel[] | IError | IValidation> {
    if (id) {
      const university = await this.findUniversityById(id);
      if ('error' in university) return university;

      const generalInfoContent = await this.readGeneralInfoFromFile(
        university.generalInfoFile,
      );
      return { ...university, generalInfoFile: generalInfoContent };
    }

    const universities = await this.#repository.find();
    const universitiesWithInfo = await Promise.all(
      universities.map(async (university) => {
        const generalInfoContent = await this.readGeneralInfoFromFile(
          university.generalInfoFile,
        );
        return { ...university, generalInfoFile: generalInfoContent };
      }),
    );

    return universitiesWithInfo;
  }

  // ---------------------------------------------------------------------------
  // UNIVERSITY DELETE
  // ---------------------------------------------------------------------------
  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const universityToDelete = await this.findUniversityById(id);
    if ('error' in universityToDelete) return universityToDelete;

    await this.#repository.delete(id);

    return { message: 'University deleted successfully' };
  }
}
