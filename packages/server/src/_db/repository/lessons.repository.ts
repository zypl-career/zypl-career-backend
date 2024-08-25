import { AppDataSource } from '../../app/globals.app.js';
import { LessonsEntity } from '../entity/lessons.entity.js';

export const LessonsRepository = AppDataSource.getRepository(
  LessonsEntity,
).extend({
  async findWithFilters({
    courseId,
    name,
    status,
    type,
    skip,
    take,
  }: {
    courseId?: string;
    name?: string;
    status?: 'lock' | 'in_progress' | 'finish';
    type?: 'pdf' | 'video';
    skip?: number;
    take?: number;
  }): Promise<LessonsEntity[]> {
    const queryBuilder = this.createQueryBuilder('lessons');

    if (courseId) {
      queryBuilder.andWhere('lessons.courseId = :courseId', { courseId });
    }

    if (name) {
      queryBuilder.andWhere('lessons.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('lessons.status = :status', { status });
    }

    if (type) {
      queryBuilder.andWhere('lessons.type = :type', { type });
    }

    return queryBuilder.skip(skip).take(take).getMany();
  },

  async countWithFilters({
    courseId,
    name,
    status,
    type,
  }: {
    courseId?: string;
    name?: string;
    status?: 'lock' | 'in_progress' | 'finish';
    type?: 'pdf' | 'video';
  }): Promise<number> {
    const queryBuilder = this.createQueryBuilder('lessons');

    if (courseId) {
      queryBuilder.andWhere('lessons.courseId = :courseId', { courseId });
    }

    if (name) {
      queryBuilder.andWhere('lessons.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('lessons.status = :status', { status });
    }

    if (type) {
      queryBuilder.andWhere('lessons.type = :type', { type });
    }

    return queryBuilder.getCount();
  },

  async findLastLessonByCourseId(
    courseId: string,
  ): Promise<LessonsEntity | null> {
    return this.createQueryBuilder('lessons')
      .where('lessons.courseId = :courseId', { courseId })
      .orderBy('lessons.item', 'DESC')
      .getOne();
  },

  async findByCourseId(courseId: string): Promise<LessonsEntity[]> {
    return this.createQueryBuilder('lessons')
      .where('lessons.courseId = :courseId', { courseId })
      .orderBy('lessons.item', 'ASC')
      .getMany();
  },

  async findNextLessonByCourseId(
    courseId: string,
    currentItem: number,
  ): Promise<LessonsEntity | null> {
    return this.createQueryBuilder('lessons')
      .where('lessons.courseId = :courseId', { courseId })
      .andWhere('lessons.item > :currentItem', { currentItem })
      .orderBy('lessons.item', 'ASC')
      .getOne();
  },
});
