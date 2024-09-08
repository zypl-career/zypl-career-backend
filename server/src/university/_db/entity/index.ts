import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EnumCities } from '../../../user/type/index.js';
import { UniversityModel } from '../model/index.js';

@Entity({ name: 'universities' })
export class UniversityEntity extends BaseEntity implements UniversityModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: EnumCities })
  city: EnumCities;

  @Column()
  generalInfoFile: string;

  @CreateDateColumn()
  createdAt: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: number;
}
