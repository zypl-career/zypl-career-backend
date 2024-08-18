// courses.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoursesModel } from '../model/_index.js';

@Entity({ name: 'courses' })
export class CoursesEntity extends BaseEntity implements CoursesModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  finishedPercentage: number;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: number;
}
