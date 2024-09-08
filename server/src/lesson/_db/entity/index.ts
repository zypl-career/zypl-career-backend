import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LessonModel } from '../model/index.js';

@Entity({ name: 'lessons' })
export class LessonEntity extends BaseEntity implements LessonModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryGeneratedColumn('increment')
  item: number;

  @Column()
  courseId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['pdf', 'video'] })
  type: 'pdf' | 'video';

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
}
