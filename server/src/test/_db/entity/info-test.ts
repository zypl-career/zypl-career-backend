import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { InfoTestModel, InfoType } from '../model/info-test.js';

@Entity({ name: 'info-test' })
export class InfoTestEntity extends BaseEntity implements InfoTestModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  email?: string;

  @Column('simple-json')
  info: InfoType;

  @Column('simple-array')
  resultTest: number[];

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: number | null;
}
