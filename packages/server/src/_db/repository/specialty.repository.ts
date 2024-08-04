import { SpecialtyEntity } from '../entity/_index.js';
import { AppDataSource } from '../../app/globals.app.js';

export const SpecialtyRepository = AppDataSource.getRepository(
  SpecialtyEntity,
).extend({
  async findByFilters(
    filters: {
      name?: string;
      class?: number;
      specializationGroup?: number;
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
    },
    page: number = 1,
    limit: number = 10,
  ): Promise<SpecialtyEntity[]> {
    const qb = this.createQueryBuilder('specialty');

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

    qb.skip((page - 1) * limit);
    qb.take(limit);

    return qb.getMany();
  },
});
