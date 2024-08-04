import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { SpecialtyModel } from '../model/_index.js';

@Entity({ name: 'specialties' })
export class SpecialtyEntity extends BaseEntity implements SpecialtyModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'EIOHPE' })
  EIOHPE: string; // Educational institutions of higher professional education

  @Column({ type: 'int' })
  class: number;

  @Column({ type: 'enum', enum: [1, 2, 3, 4, 5] })
  specializationGroup: 1 | 2 | 3 | 4 | 5;

  @Column()
  clusterName: string;

  @Column()
  clusterTag: string;

  @Column()
  specialtyDescription: string;

  @Column({ type: 'int' })
  specialtyCode: number;

  @Column()
  specialtyName: string;

  @Column()
  formOfEducation: string;

  @Column()
  typeOfStudy: string;

  @Column()
  languageOfStudy: string;

  @Column()
  universityName: string;

  @Column({ type: 'int' })
  monthlyIncome: number;

  @Column({ type: 'int' })
  skillsLevel: number;

  @Column()
  futureGrowth: string;

  @Column()
  overview: string;

  @Column('text', { array: true })
  careerOpportunities: string[];

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: number;
}
