import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SpecialtyRepository } from '../_db/repository/specialty.repository.js';
import {
  ISpecialtyFilterDTO,
  ISpecialtyCreateDataDTO,
  ISpecialtyUpdateDataDTO,
} from '../types/_index.js';
import {
  CreateSpecialtyDto,
  FilterSpecialtyDto,
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

  private sanitizeSpecialty(specialty: SpecialtyModel): SpecialtyModel {
    return specialty; // Adjust if there are any sensitive fields to sanitize
  }

  private transformFilterToWhere(filters: ISpecialtyFilterDTO): any {
    const qb = this.#repository.createQueryBuilder('specialty');

    if (filters.name) {
      qb.andWhere('specialty.name ILIKE :name', { name: `%${filters.name}%` });
    }

    if (filters.class !== undefined) {
      qb.andWhere('specialty.class = :class', { class: filters.class });
    }

    if (filters.specializationGroup !== undefined) {
      qb.andWhere('specialty.specializationGroup = :specializationGroup', {
        specializationGroup: filters.specializationGroup,
      });
    }

    if (filters.clusterName) {
      qb.andWhere('specialty.clusterName = :clusterName', {
        clusterName: filters.clusterName,
      });
    }

    if (filters.clusterTag) {
      qb.andWhere('specialty.clusterTag = :clusterTag', {
        clusterTag: filters.clusterTag,
      });
    }

    if (filters.specialtyCode !== undefined) {
      qb.andWhere('specialty.specialtyCode = :specialtyCode', {
        specialtyCode: filters.specialtyCode,
      });
    }

    if (filters.specialtyName) {
      qb.andWhere('specialty.specialtyName = :specialtyName', {
        specialtyName: filters.specialtyName,
      });
    }

    if (filters.formOfEducation) {
      qb.andWhere('specialty.formOfEducation = :formOfEducation', {
        formOfEducation: filters.formOfEducation,
      });
    }

    if (filters.typeOfStudy) {
      qb.andWhere('specialty.typeOfStudy = :typeOfStudy', {
        typeOfStudy: filters.typeOfStudy,
      });
    }

    if (filters.languageOfStudy) {
      qb.andWhere('specialty.languageOfStudy = :languageOfStudy', {
        languageOfStudy: filters.languageOfStudy,
      });
    }

    if (filters.universityName) {
      qb.andWhere('specialty.universityName = :universityName', {
        universityName: filters.universityName,
      });
    }

    if (filters.monthlyIncome !== undefined) {
      qb.andWhere('specialty.monthlyIncome = :monthlyIncome', {
        monthlyIncome: filters.monthlyIncome,
      });
    }

    if (filters.careerOpportunities && filters.careerOpportunities.length > 0) {
      qb.andWhere(
        'EXISTS (SELECT 1 FROM UNNEST(specialty.careerOpportunities) AS opportunity WHERE opportunity = ANY(:careerOpportunities))',
        { careerOpportunities: filters.careerOpportunities },
      );
    }

    return qb;
  }

  // ---------------------------------------------------------------------------
  // SPECIALTY CREATE
  // ---------------------------------------------------------------------------
  async createSpecialty(
    specialty: ISpecialtyCreateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const createSpecialtyDto = plainToInstance(CreateSpecialtyDto, specialty);
    const validationErrors = await this.validateDto(createSpecialtyDto);
    if (validationErrors) return validationErrors;

    const newSpecialty = { ...specialty };
    await this.#repository.save(newSpecialty);

    return { message: 'Specialty created successfully' };
  }

  // ---------------------------------------------------------------------------
  // SPECIALTY UPDATE
  // ---------------------------------------------------------------------------
  async updateSpecialty(
    id: string,
    specialty: ISpecialtyUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const validationErrors = await this.validateDto(specialty);
    if (validationErrors) return validationErrors;

    const specialtyToUpdate = await this.findSpecialtyById(id);

    if ('error' in specialtyToUpdate) return specialtyToUpdate;

    Object.assign(specialtyToUpdate, specialty);

    await this.#repository.save(specialtyToUpdate);

    return { message: 'Specialty updated successfully' };
  }

  // ---------------------------------------------------------------------------
  // SPECIALTY GET
  // ---------------------------------------------------------------------------
  async getSpecialty(
    id?: string,
  ): Promise<SpecialtyModel | SpecialtyModel[] | IError | IValidation> {
    if (id) {
      const specialty = await this.findSpecialtyById(id);
      if ('error' in specialty) return specialty;
      return this.sanitizeSpecialty(specialty);
    }

    const specialties = (await this.#repository.find()).map(
      this.sanitizeSpecialty,
    );
    return specialties;
  }

  // ---------------------------------------------------------------------------
  // SPECIALTY FILTER
  // ---------------------------------------------------------------------------
  async filterSpecialty(
    filters: ISpecialtyFilterDTO,
    page: number = 1,
    limit: number = 10,
  ): Promise<IPaginationResponse<SpecialtyModel> | IValidation | IError> {
    const filterDto = plainToInstance(FilterSpecialtyDto, filters);
    const validationErrors = await this.validateDto(filterDto);
    if (validationErrors) return validationErrors;

    const qb = this.transformFilterToWhere(filters);

    const [specialties, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: specialties.map(this.sanitizeSpecialty),
      total,
      page,
      limit,
    };
  }

  // ---------------------------------------------------------------------------
  // SPECIALTY DELETE
  // ---------------------------------------------------------------------------
  async deleteSpecialty(id: string): Promise<IMessage | IError | IValidation> {
    const specialtyToDelete = await this.findSpecialtyById(id);
    if ('error' in specialtyToDelete) return specialtyToDelete;

    await this.#repository.delete(id);

    return { message: 'Specialty deleted successfully' };
  }
}
