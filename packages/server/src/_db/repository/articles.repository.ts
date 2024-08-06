import { isArray } from 'class-validator';
import { AppDataSource } from '../../app/globals.app.js';
import { ArticlesEntity } from '../entity/_index.js';

export const ArticlesRepository = AppDataSource.getRepository(
  ArticlesEntity,
).extend({
  async findWithFilters({
    title,
    description,
    minutesRead,
    generalInfo,
    hashtags,
    skip,
    take,
  }: {
    title?: string;
    description?: string;
    minutesRead?: number;
    generalInfo?: string;
    hashtags?: string[];
    skip?: number;
    take?: number;
  }): Promise<ArticlesEntity[]> {
    const queryBuilder = this.createQueryBuilder('articles');

    if (title) {
      queryBuilder.andWhere('articles.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (description) {
      queryBuilder.andWhere('articles.description ILIKE :description', {
        description: `%${description}%`,
      });
    }

    if (minutesRead !== undefined) {
      queryBuilder.andWhere('articles.minutesRead = :minutesRead', {
        minutesRead,
      });
    }

    if (generalInfo) {
      queryBuilder.andWhere('articles.generalInfo ILIKE :generalInfo', {
        generalInfo: `%${generalInfo}%`,
      });
    }

    if (hashtags && isArray(hashtags) && hashtags.length > 0) {
      queryBuilder.andWhere('articles.hashtags && :hashtags', { hashtags });
    }

    return queryBuilder.skip(skip).take(take).getMany();
  },

  async countWithFilters({
    title,
    description,
    minutesRead,
    generalInfo,
    hashtags,
  }: {
    title?: string;
    description?: string;
    minutesRead?: number;
    generalInfo?: string;
    hashtags?: string[];
  }): Promise<number> {
    const queryBuilder = this.createQueryBuilder('articles');

    if (title) {
      queryBuilder.andWhere('articles.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (description) {
      queryBuilder.andWhere('articles.description ILIKE :description', {
        description: `%${description}%`,
      });
    }

    if (minutesRead !== undefined) {
      queryBuilder.andWhere('articles.minutesRead = :minutesRead', {
        minutesRead,
      });
    }

    if (generalInfo) {
      queryBuilder.andWhere('articles.generalInfo ILIKE :generalInfo', {
        generalInfo: `%${generalInfo}%`,
      });
    }

    if (hashtags && isArray(hashtags) && hashtags.length > 0) {
      queryBuilder.andWhere('articles.hashtags && :hashtags', { hashtags });
    }

    return queryBuilder.getCount();
  },

  async findByHashtags(hashtags: string[] | string): Promise<ArticlesEntity[]> {
    if (!isArray(hashtags)) {
      hashtags = [hashtags];
    }

    return this.createQueryBuilder('articles')
      .where('articles.hashtags && :hashtags', { hashtags })
      .getMany();
  },

  async getDistinctHashtags(): Promise<string[]> {
    const result = await this.createQueryBuilder('articles')
      .select('UNNEST(articles.hashtags)', 'hashtag')
      .distinct(true)
      .getRawMany();

    return result.map((row) => row.hashtag);
  },
});
