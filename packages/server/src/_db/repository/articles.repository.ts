import { isArray } from 'class-validator';
import { AppDataSource } from '../../app/globals.app.js';
import { ArticlesEntity } from '../entity/_index.js';

export const ArticlesRepository = AppDataSource.getRepository(
  ArticlesEntity,
).extend({
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
