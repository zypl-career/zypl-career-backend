import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserModel } from '../model/_index.js';

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

  @Column({ type: 'enum', enum: ['male', 'female'] })
  gender: 'male' | 'female';

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ nullable: true })
  district?: string;

  @Column({ type: 'enum', enum: ['student', 'teacher', 'parents'] })
  role: 'student' | 'teacher' | 'parents';

  @Column({ nullable: true })
  school?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: number;
}
