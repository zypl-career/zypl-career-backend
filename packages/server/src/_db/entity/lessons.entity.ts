import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { LessonsModel } from '../model/_index.js';
import { AppDataSource } from '../../app/globals.app.js';

@Entity({ name: 'lessons' })
export class LessonsEntity extends BaseEntity implements LessonsModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  item: number;

  @Column()
  courseId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['lock', 'in_progress', 'finish'] })
  status: 'lock' | 'in_progress' | 'finish';

  @Column()
  resource: string;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: number;

  @BeforeInsert()
  async setItem(): Promise<void> {
    const lastLesson = await AppDataSource.getRepository(LessonsEntity)
      .createQueryBuilder('lesson')
      .where('lesson.courseId = :courseId', { courseId: this.courseId })
      .orderBy('lesson.item', 'DESC')
      .getOne();

    this.item = lastLesson ? lastLesson.item + 1 : 1;
  }
}
