import { AppDataSource } from '../../app/globals.app.js';
import { EducationCenterEntity } from '../entity/_index.js';

export const EducationCenterRepository = AppDataSource.getRepository(
  EducationCenterEntity,
).extend({
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
  },

  async countWithFilters({
    title,
    city,
  }: {
    title?: string;
    city?: string;
  }): Promise<number> {
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
  },
});
