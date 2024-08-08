import { AppDataSource } from '../../app/globals.app.js';
import { PartnerEntity } from '../entity/partner.entity.js';

export const PartnerRepository = AppDataSource.getRepository(
  PartnerEntity,
).extend({
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
  },

  async countWithFilters(): Promise<number> {
    return this.createQueryBuilder('partner').getCount();
  },
});
