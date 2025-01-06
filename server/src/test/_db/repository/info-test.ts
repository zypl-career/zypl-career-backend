import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { InfoTestEntity } from '../entity/info-test.js';

@Injectable()
export class InfoTestRepository extends Repository<InfoTestEntity> {
  constructor(private dataSource: DataSource) {
    super(InfoTestEntity, dataSource.createEntityManager());
  }
  async findWithFilters({
    email,
    skip,
    take,
  }: {
    email?: string;
    skip?: number;
    take?: number;
  }): Promise<InfoTestEntity[]> {
    const queryBuilder = this.createQueryBuilder('info-test');

    if (email) {
      queryBuilder.andWhere('info-test.email = :email', { email });
    }

    return queryBuilder.skip(skip).take(take).getMany();
  }
}
