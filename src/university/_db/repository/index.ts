import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EnumCities } from '../../../user/type/index.js';
import { UniversityEntity } from '../entity/index.js';

@Injectable()
export class UniversityRepository extends Repository<UniversityEntity> {
  constructor(private dataSource: DataSource) {
    super(UniversityEntity, dataSource.createEntityManager());
  }
  async findWithFilters({
    name,
    city,
    skip,
    take,
  }: {
    name?: string;
    city?: EnumCities;
    skip?: number;
    take?: number;
  }): Promise<UniversityEntity[]> {
    const queryBuilder = this.createQueryBuilder('universities');

    if (name) {
      queryBuilder.andWhere('universities.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (city) {
      queryBuilder.andWhere('universities.city = :city', { city });
    }

    return queryBuilder.skip(skip).take(take).getMany();
  }

  async countWithFilters({ name, city }: { name?: string; city?: EnumCities }): Promise<number> {
    const queryBuilder = this.createQueryBuilder('universities');

    if (name) {
      queryBuilder.andWhere('universities.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (city) {
      queryBuilder.andWhere('universities.city = :city', { city });
    }

    return queryBuilder.getCount();
  }
}
