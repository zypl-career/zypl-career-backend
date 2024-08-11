import { AppDataSource } from '../../app/globals.app.js';
import { TestEntity } from '../entity/_index.js';

export const TestRepository = AppDataSource.getRepository(TestEntity).extend({
  async findWithFilters({
    skip,
    take,
  }: {
    skip?: number;
    take?: number;
  }): Promise<TestEntity[]> {
    const queryBuilder = this.createQueryBuilder('tests');
    return queryBuilder.skip(skip).take(take).getMany();
  },
});
