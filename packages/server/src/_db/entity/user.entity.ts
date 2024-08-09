import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '../model/_index.js';
import { EnumCities } from '../../types/_index.js';

@Entity()
export class UserEntity extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  patronymic?: string;

  @Column()
  gender: 'male' | 'female';

  @Column({ nullable: true })
  age?: number;

  @Column({ type: 'enum', enum: EnumCities, nullable: true })
  district?: EnumCities;

  @Column()
  role: 'student' | 'teacher' | 'parents';

  @Column({ nullable: true })
  school?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @Column({ nullable: true })
  deletedAt: number;
}
