import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticlesModel } from '../model/_index.js';

@Entity({ name: 'articles' })
export class ArticlesEntity extends BaseEntity implements ArticlesModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  minutesRead: number;

  @Column()
  generalInfoFile: string;

  @Column('text', { array: true })
  hashtags: string[];

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: number;
}
