import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PartnerEntity } from '../entity/index.js';

@Injectable()
export class PartnerRepository extends Repository<PartnerEntity> {
  constructor(private dataSource: DataSource) {
    super(PartnerEntity, dataSource.createEntityManager());
  }
  async findWithFilters({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }): Promise<PartnerEntity[]> {
    const queryBuilder = this.createQueryBuilder('partner');
    const skip = (page - 1) * limit;
    return queryBuilder.skip(skip).take(limit).getMany();
  }

  async countWithFilters(): Promise<number> {
    return this.createQueryBuilder('partner').getCount();
  }
}
