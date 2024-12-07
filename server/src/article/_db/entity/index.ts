import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ArticleModel } from '../model/index.js';
import { EnumRoles } from '../../../user/type/index.js';

@Entity({ name: 'articles' })
export class ArticleEntity extends BaseEntity implements ArticleModel {
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

  @Column({ nullable: true })
  type?: EnumRoles;

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
