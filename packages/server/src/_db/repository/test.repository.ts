import { AppDataSource } from '../../app/globals.app.js';
import { TestEntity } from '../entity/_index.js';

export const TestRepository = AppDataSource.getRepository(TestEntity).extend({
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
  },
});
