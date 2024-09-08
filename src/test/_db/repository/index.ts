import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TestEntity } from '../entity/index.js';

@Injectable()
export class TestRepository extends Repository<TestEntity> {
  constructor(private dataSource: DataSource) {
    super(TestEntity, dataSource.createEntityManager());
  }
  async findWithFilters({
    userId,
    skip,
    take,
  }: {
    userId?: string;
    skip?: number;
    take?: number;
  }): Promise<TestEntity[]> {
    const queryBuilder = this.createQueryBuilder('tests');

    if (userId) {
      queryBuilder.andWhere('tests.userId = :userId', { userId });
    }

    return queryBuilder.skip(skip).take(take).getMany();
  }
}
