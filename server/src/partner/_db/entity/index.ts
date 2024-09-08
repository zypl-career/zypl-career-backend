import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PartnerModel } from '../model/index.js';

@Entity({ name: 'partners' })
export class PartnerEntity extends BaseEntity implements PartnerModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt: number;
}
