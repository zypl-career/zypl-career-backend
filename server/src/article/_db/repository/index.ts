import { Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';
import { DataSource, Repository } from 'typeorm';

import { ArticleEntity } from '../entity/index.js';
import { EnumRoles } from '../../../user/type/index.js';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private dataSource: DataSource) {
    super(ArticleEntity, dataSource.createEntityManager());
  }

  async findWithFilters({
    title,
    description,
    minutesRead,
    generalInfo,
    type,
    hashtags,
    skip,
    take,
  }: {
    title?: string;
    description?: string;
    minutesRead?: number;
    type?: EnumRoles; 
    generalInfo?: string;
    hashtags?: string[];
    skip?: number;
    take?: number;
  }): Promise<ArticleEntity[]> {
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

    if (type) { 
      queryBuilder.andWhere('articles.type = :type', {
        type,
      });
    }

    if (hashtags && isArray(hashtags) && hashtags.length > 0) {
      queryBuilder.andWhere('articles.hashtags && :hashtags', { hashtags });
    }

    return queryBuilder.skip(skip).take(take).getMany();
  }

  async countWithFilters({
    title,
    description,
    minutesRead,
    generalInfo,
    hashtags,
    type
  }: {
    title?: string;
    description?: string;
    minutesRead?: number;
    generalInfo?: string;
    hashtags?: string[];
    type?: EnumRoles; // Made type optional
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

    if (type) {
      queryBuilder.andWhere('articles.type = :type', {
        type,
      });
    }
    return queryBuilder.getCount();
  }

  async findByHashtags(hashtags: string[] | string): Promise<ArticleEntity[]> {
    if (!isArray(hashtags)) {
      hashtags = [hashtags];
    }

    return this.createQueryBuilder('articles')
      .where('articles.hashtags && :hashtags', { hashtags })
      .getMany();
  }

  async getDistinctHashtags(): Promise<string[]> {
    const result = await this.createQueryBuilder('articles')
      .select('UNNEST(articles.hashtags)', 'hashtag')
      .distinct(true)
      .getRawMany();

    return result.map((row) => row.hashtag);
  }
}
