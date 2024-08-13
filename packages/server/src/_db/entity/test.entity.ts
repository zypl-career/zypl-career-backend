import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { TestModel } from '../model/test.model.js';

@Entity({ name: 'tests' })
export class TestEntity extends BaseEntity implements TestModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'userId' })
  userId: string;

  @Column('simple-array')
  resultTest: number[];

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: number;
}
