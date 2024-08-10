import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SpecialtyRepository } from '../_db/repository/specialty.repository.js';
import {
  ISpecialtyCreateDataDTO,
  ISpecialtyUpdateDataDTO,
  ISpecialtyGetDataDTO,
} from '../types/_index.js';
import {
  CreateSpecialtyDto,
  getSpecialtyDTO,
  UpdateSpecialtyDto,
} from '../dto/specialty.dto.js';
import { formatValidationErrors } from '../util/utils.js';
import { SpecialtyModel } from '../_db/model/specialty.model.js';
import {
  IError,
  IMessage,
  IValidation,
  IPaginationResponse,
} from '../types/_index.js';

@Injectable()
export class SpecialtyService {
  #repository = SpecialtyRepository;

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

  private async findSpecialtyById(
    id: string,
  ): Promise<SpecialtyModel | IError> {
    const specialty = await this.#repository.findOne({ where: { id } });
    if (!specialty) {
      return { error: 'Specialty not found' };
    }
    return specialty;
  }

  // ---------------------------------------------------------------------------
  // SPECIALTY CREATE
  // ---------------------------------------------------------------------------
  async create(
    specialty: ISpecialtyCreateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const createSpecialtyDto = plainToInstance(CreateSpecialtyDto, specialty);
    const validationErrors = await this.validateDto(createSpecialtyDto);
    if (validationErrors) return validationErrors;

    const payload = await this.#repository.save(specialty);

    return { message: 'Specialty created successfully', payload };
  }

  // ---------------------------------------------------------------------------
  // SPECIALTY UPDATE
  // ---------------------------------------------------------------------------
  async update(
    id: string,
    specialty: ISpecialtyUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const updateSpecialtyDto = plainToInstance(UpdateSpecialtyDto, specialty);
    const validationErrors = await this.validateDto(updateSpecialtyDto);
    if (validationErrors) return validationErrors;

    const specialtyToUpdate = await this.findSpecialtyById(id);

    if ('error' in specialtyToUpdate) return specialtyToUpdate;

    Object.assign(specialtyToUpdate, specialty);

    const payload = await this.#repository.save(specialtyToUpdate);

    return { message: 'Specialty updated successfully', payload };
  }

  // ---------------------------------------------------------------------------
  // SPECIALTY GET
  // ---------------------------------------------------------------------------

  async get(
    id?: string,
    filters?: ISpecialtyGetDataDTO,
  ): Promise<
    | SpecialtyModel
    | SpecialtyModel[]
    | IError
    | IValidation
    | IPaginationResponse<SpecialtyModel>
  > {
    if (id) {
      const specialty = await this.findSpecialtyById(id);
      if ('error' in specialty) return specialty;

      return specialty;
    }

    let specialties: SpecialtyModel[];

    if (filters) {
      const createUserDto = plainToInstance(getSpecialtyDTO, filters);
      const validationErrors = await this.validateDto(createUserDto);
      if (validationErrors) return validationErrors;
      const {
        name,
        class: classNumber,
        specializationGroup,
        clusterName,
        clusterTag,
        specialtyCode,
        specialtyName,
        formOfEducation,
        typeOfStudy,
        languageOfStudy,
        universityName,
        monthlyIncome,
        careerOpportunities,
        page,
        limit,
      } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      specialties = await this.#repository.findWithFilters({
        name,
        class: classNumber,
        specializationGroup,
        clusterName,
        clusterTag,
        specialtyCode,
        specialtyName,
        formOfEducation,
        typeOfStudy,
        languageOfStudy,
        universityName,
        monthlyIncome,
        careerOpportunities,
        skip,
        take: limit,
      });
    } else {
      specialties = await this.#repository.find();
    }
    return {
      total: specialties.length,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: specialties,
    };
  }

  // ---------------------------------------------------------------------------
  // SPECIALTY DELETE
  // ---------------------------------------------------------------------------
  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const specialtyToDelete = await this.findSpecialtyById(id);
    if ('error' in specialtyToDelete) return specialtyToDelete;

    await this.#repository.delete(id);

    return { message: 'Specialty deleted successfully' };
  }
}
