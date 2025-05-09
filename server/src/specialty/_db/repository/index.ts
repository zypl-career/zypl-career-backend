import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ISpecialtyGetDataDTO } from '../../type/index.js';
import { SpecialtyEntity } from '../entity/index.js';

@Injectable()
export class SpecialtyRepository extends Repository<SpecialtyEntity> {
  constructor(private dataSource: DataSource) {
    super(SpecialtyEntity, dataSource.createEntityManager());
  }
  async findWithFilters({
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
    take,
    sortSpecializationGroup,
  }: {
    name?: string;
    class?: number;
    specializationGroup?: 1 | 2 | 3 | 4 | 5;
    clusterName?: string;
    clusterTag?: string;
    specialtyCode?: number;
    specialtyName?: string;
    formOfEducation?: string;
    typeOfStudy?: string;
    languageOfStudy?: string;
    universityName?: string;
    monthlyIncome?: number;
    careerOpportunities?: string[];
    skip?: number;
    take?: number;
    sortSpecializationGroup?: number[];
  }): Promise<SpecialtyEntity[]> {
    const queryBuilder = this.createQueryBuilder('specialties');

    if (name) {
      queryBuilder.andWhere('specialties.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (classNumber) {
      queryBuilder.andWhere('specialties.class = :classNumber', {
        classNumber,
      });
    }

    if (specializationGroup) {
      queryBuilder.andWhere('specialties.specializationGroup = :specializationGroup', {
        specializationGroup,
      });
    }

    if (clusterName) {
      queryBuilder.andWhere('specialties.clusterName ILIKE :clusterName', {
        clusterName: `%${clusterName}%`,
      });
    }

    if (clusterTag) {
      queryBuilder.andWhere('specialties.clusterTag ILIKE :clusterTag', {
        clusterTag: `%${clusterTag}%`,
      });
    }

    if (specialtyCode) {
      queryBuilder.andWhere('specialties.specialtyCode = :specialtyCode', {
        specialtyCode,
      });
    }

    if (specialtyName) {
      queryBuilder.andWhere('specialties.specialtyName ILIKE :specialtyName', {
        specialtyName: `%${specialtyName}%`,
      });
    }

    if (formOfEducation) {
      queryBuilder.andWhere('specialties.formOfEducation ILIKE :formOfEducation', {
        formOfEducation: `%${formOfEducation}%`,
      });
    }

    if (typeOfStudy) {
      queryBuilder.andWhere('specialties.typeOfStudy ILIKE :typeOfStudy', {
        typeOfStudy: `%${typeOfStudy}%`,
      });
    }

    if (languageOfStudy) {
      queryBuilder.andWhere('specialties.languageOfStudy ILIKE :languageOfStudy', {
        languageOfStudy: `%${languageOfStudy}%`,
      });
    }

    if (universityName) {
      queryBuilder.andWhere('specialties.universityName ILIKE :universityName', {
        universityName: `%${universityName}%`,
      });
    }

    if (monthlyIncome) {
      queryBuilder.andWhere('specialties.monthlyIncome = :monthlyIncome', {
        monthlyIncome,
      });
    }

    if (careerOpportunities && careerOpportunities.length > 0) {
      queryBuilder.andWhere('specialties.careerOpportunities && :careerOpportunities', {
        careerOpportunities,
      });
    }

    if (sortSpecializationGroup?.length) {
      const orderByCase = Array.from(sortSpecializationGroup).reduce((acc, group, index) => {
        return acc + ` WHEN '${group}' THEN ${index + 1}`;
      }, 'CASE specialties."specializationGroup"::text');

      queryBuilder.addOrderBy(orderByCase + ' END');
    }

    if (skip !== undefined) {
      queryBuilder.skip(skip);
    }

    if (take !== undefined) {
      queryBuilder.take(take);
    }

    return queryBuilder.getMany();
  }

  async countWithFilters({
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
  }: ISpecialtyGetDataDTO): Promise<number> {
    const queryBuilder = this.createQueryBuilder('specialties');

    if (name) queryBuilder.andWhere('specialties.name ILIKE :name', { name: `%${name}%` });
    if (classNumber) queryBuilder.andWhere('specialties.class = :classNumber', { classNumber });
    if (specializationGroup)
      queryBuilder.andWhere('specialties.specializationGroup = :specializationGroup', {
        specializationGroup,
      });
    if (clusterName)
      queryBuilder.andWhere('specialties.clusterName ILIKE :clusterName', {
        clusterName: `%${clusterName}%`,
      });
    if (clusterTag)
      queryBuilder.andWhere('specialties.clusterTag ILIKE :clusterTag', {
        clusterTag: `%${clusterTag}%`,
      });
    if (specialtyCode)
      queryBuilder.andWhere('specialties.specialtyCode = :specialtyCode', { specialtyCode });
    if (specialtyName)
      queryBuilder.andWhere('specialties.specialtyName ILIKE :specialtyName', {
        specialtyName: `%${specialtyName}%`,
      });
    if (formOfEducation)
      queryBuilder.andWhere('specialties.formOfEducation ILIKE :formOfEducation', {
        formOfEducation: `%${formOfEducation}%`,
      });
    if (typeOfStudy)
      queryBuilder.andWhere('specialties.typeOfStudy ILIKE :typeOfStudy', {
        typeOfStudy: `%${typeOfStudy}%`,
      });
    if (languageOfStudy)
      queryBuilder.andWhere('specialties.languageOfStudy ILIKE :languageOfStudy', {
        languageOfStudy: `%${languageOfStudy}%`,
      });
    if (universityName)
      queryBuilder.andWhere('specialties.universityName ILIKE :universityName', {
        universityName: `%${universityName}%`,
      });
    if (monthlyIncome)
      queryBuilder.andWhere('specialties.monthlyIncome = :monthlyIncome', { monthlyIncome });
    if (careerOpportunities && careerOpportunities.length > 0) {
      queryBuilder.andWhere('specialties.careerOpportunities && ARRAY[:...careerOpportunities]', {
        careerOpportunities,
      });
    }

    return queryBuilder.getCount();
  }
}
