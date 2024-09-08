import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EducationCenterEntity } from '../entity/index.js';

@Injectable()
export class EducationCenterRepository extends Repository<EducationCenterEntity> {
  constructor(private dataSource: DataSource) {
    super(EducationCenterEntity, dataSource.createEntityManager());
  }

  async findWithFilters({
    title,
    city,
    skip,
    take,
  }: {
    title?: string;
    city?: string;
    skip?: number;
    take?: number;
  }): Promise<EducationCenterEntity[]> {
    const queryBuilder = this.createQueryBuilder('educationCenter');

    if (title) {
      queryBuilder.andWhere('educationCenter.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (city) {
      queryBuilder.andWhere('educationCenter.city = :city', { city });
    }

    return queryBuilder.skip(skip).take(take).getMany();
  }

  async countWithFilters({ title, city }: { title?: string; city?: string }): Promise<number> {
    const queryBuilder = this.createQueryBuilder('educationCenter');

    if (title) {
      queryBuilder.andWhere('educationCenter.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (city) {
      queryBuilder.andWhere('educationCenter.city = :city', { city });
    }

    return queryBuilder.getCount();
  }
}
