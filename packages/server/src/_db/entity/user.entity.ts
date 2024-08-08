import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CitiesAndRegionsOfTajikistan, UserModel } from '../model/_index.js';

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

  @Column({ type: 'enum', enum: CitiesAndRegionsOfTajikistan, nullable: true })
  district?: CitiesAndRegionsOfTajikistan;

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
