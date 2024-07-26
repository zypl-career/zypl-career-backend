import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UniversityModel } from '../model/_index.js';

@Entity({ name: 'universities' })
export class UniversityEntity extends BaseEntity implements UniversityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  generalInfoFile: string;

  @CreateDateColumn()
  createdAt: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: number;
}
