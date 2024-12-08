import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EnumCities, EnumGenders } from '../../type/index.js';
import { UserFastModel } from '../model/index.js';

@Entity({ name: 'users_fast' })
export class UserFastEntity extends BaseEntity implements UserFastModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: EnumGenders })
  gender: EnumGenders;

  @Column({ nullable: true })
  age?: number;

  @Column({ type: 'enum', enum: EnumCities })
  district?: EnumCities;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @Column({ nullable: true })
  deletedAt: number;
}
