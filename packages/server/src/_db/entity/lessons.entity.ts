import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LessonsModel } from '../model/_index.js';

@Entity({ name: 'lessons' })
export class LessonsEntity extends BaseEntity implements LessonsModel {
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
