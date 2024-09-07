import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EnumCities, EnumGenders, EnumRoles } from '../../type/index.js';
import { UserModel } from '../model/index.js';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  patronymic?: string;

  @Column('text', { array: true, nullable: true })
  accept?: string[];

  @Column({ type: 'enum', enum: EnumGenders })
  gender: EnumGenders;

  @Column({ nullable: true })
  age?: number;

  @Column({ type: 'enum', enum: EnumCities })
  district?: EnumCities;

  @Column({ type: 'enum', enum: EnumRoles })
  role: EnumRoles;

  @Column({ nullable: true })
  school?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  emailConfirmed?: boolean;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @Column({ nullable: true })
  deletedAt: number;
}
