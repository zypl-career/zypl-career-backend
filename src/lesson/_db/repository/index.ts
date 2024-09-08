import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { LessonEntity } from '../entity/index.js';

@Injectable()
export class LessonRepository extends Repository<LessonEntity> {
  constructor(private dataSource: DataSource) {
    super(LessonEntity, dataSource.createEntityManager());
  }
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
  }): Promise<LessonEntity[]> {
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
  }

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
  }

  async findLastLessonByCourseId(courseId: string): Promise<LessonEntity | null> {
    return this.createQueryBuilder('lessons')
      .where('lessons.courseId = :courseId', { courseId })
      .orderBy('lessons.item', 'DESC')
      .getOne();
  }

  async findByCourseId(courseId: string): Promise<LessonEntity[]> {
    return this.createQueryBuilder('lessons')
      .where('lessons.courseId = :courseId', { courseId })
      .orderBy('lessons.item', 'ASC')
      .getMany();
  }

  async findNextLessonByCourseId(
    courseId: string,
    currentItem: number,
  ): Promise<LessonEntity | null> {
    return this.createQueryBuilder('lessons')
      .where('lessons.courseId = :courseId', { courseId })
      .andWhere('lessons.item > :currentItem', { currentItem })
      .orderBy('lessons.item', 'ASC')
      .getOne();
  }
}
