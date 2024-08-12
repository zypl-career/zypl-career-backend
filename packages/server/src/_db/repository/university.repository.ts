import { AppDataSource } from '../../app/globals.app.js';
import { EnumCities } from '../../types/base.js';
import { UniversityEntity } from '../entity/_index.js';

export const UniversityRepository = AppDataSource.getRepository(
  UniversityEntity,
).extend({
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
  },

  async countWithFilters({
    name,
    city,
  }: {
    name?: string;
    city?: EnumCities;
  }): Promise<number> {
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
  },
});
