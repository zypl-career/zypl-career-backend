import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResultModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  time: number;

  @Column()
  modelResults: string;

  @Column()
  data: string;

  @Column()
  timeSpent: number;

  constructor() {
    super();
    this.modelResults = '';
    this.data = '';
    this.email = '';
    this.name = '';
    this.time = 0;
    this.timeSpent = 0;
  }
}
