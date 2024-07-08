import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Verify extends BaseEntity {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number;

  @Column()
  email: string;

  @Column()
  code: number;

  constructor() {
    super();
    this.email = '';
    this.code = 0;
  }
}
