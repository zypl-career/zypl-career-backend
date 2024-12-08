import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EnumCities, EnumGenders } from '../../type/index.js';
import { UserFastEntity } from '../entity/index.js';

@Injectable()
export class UserFastRepository extends Repository<UserFastEntity> {
  constructor(private dataSource: DataSource) {
    super(UserFastEntity, dataSource.createEntityManager());
  }

  async findWithFilters({
    gender,
    age,
    district,
    skip,
    take,
  }: {
    gender?: EnumGenders;
    age?: number;
    district?: EnumCities;
    skip?: number;
    take?: number;
  }): Promise<UserFastEntity[]> {
    const queryBuilder = this.createQueryBuilder('users');

    if (gender) {
      queryBuilder.andWhere('users.gender = :gender', { gender });
    }

    if (age !== undefined) {
      queryBuilder.andWhere('users.age = :age', { age });
    }

    if (district) {
      queryBuilder.andWhere('users.district = :district', { district });
    }

    return queryBuilder.skip(skip).take(take).getMany();
  }

  async countWithFilters({
    gender,
    age,
    district,
  }: {
    gender?: EnumGenders;
    age?: number;
    district?: EnumCities;
  }): Promise<number> {
    const queryBuilder = this.createQueryBuilder('users');

    if (gender) {
      queryBuilder.andWhere('users.gender = :gender', { gender });
    }

    if (age !== undefined) {
      queryBuilder.andWhere('users.age = :age', { age });
    }

    if (district) {
      queryBuilder.andWhere('users.district = :district', { district });
    }

    return queryBuilder.getCount();
  }
}
