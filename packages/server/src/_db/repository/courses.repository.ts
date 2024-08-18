import { isArray } from 'class-validator';
import { AppDataSource } from '../../app/globals.app.js';
import { CoursesEntity } from '../entity/_index.js';

export const CoursesRepository = AppDataSource.getRepository(
  CoursesEntity,
).extend({
  async findWithFilters({
    title,
    description,
    finishedPercentage,
    tags,
    skip,
    take,
  }: {
    title?: string;
    description?: string;
    finishedPercentage?: number;
    tags?: string[];
    skip?: number;
    take?: number;
  }): Promise<CoursesEntity[]> {
    const queryBuilder = this.createQueryBuilder('courses');

    if (title) {
      queryBuilder.andWhere('courses.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (description) {
      queryBuilder.andWhere('courses.description ILIKE :description', {
        description: `%${description}%`,
      });
    }

    if (finishedPercentage !== undefined) {
      queryBuilder.andWhere(
        'courses.finishedPercentage = :finishedPercentage',
        {
          finishedPercentage,
        },
      );
    }

    if (tags && isArray(tags) && tags.length > 0) {
      queryBuilder.andWhere('courses.tags && :tags', { tags });
    }

    return queryBuilder.skip(skip).take(take).getMany();
  },

  async countWithFilters({
    title,
    description,
    finishedPercentage,
    tags,
  }: {
    title?: string;
    description?: string;
    finishedPercentage?: number;
    tags?: string[];
  }): Promise<number> {
    const queryBuilder = this.createQueryBuilder('courses');

    if (title) {
      queryBuilder.andWhere('courses.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (description) {
      queryBuilder.andWhere('courses.description ILIKE :description', {
        description: `%${description}%`,
      });
    }

    if (finishedPercentage !== undefined) {
      queryBuilder.andWhere(
        'courses.finishedPercentage = :finishedPercentage',
        {
          finishedPercentage,
        },
      );
    }

    if (tags && isArray(tags) && tags.length > 0) {
      queryBuilder.andWhere('courses.tags && :tags', { tags });
    }

    return queryBuilder.getCount();
  },

  async findByTags(tags: string[] | string): Promise<CoursesEntity[]> {
    if (!isArray(tags)) {
      tags = [tags];
    }

    return this.createQueryBuilder('courses')
      .where('courses.tags && :tags', { tags })
      .getMany();
  },

  async getDistinctTags(): Promise<string[]> {
    const result = await this.createQueryBuilder('courses')
      .select('UNNEST(courses.tags)', 'tag')
      .distinct(true)
      .getRawMany();

    return result.map((row) => row.tag);
  },
});
