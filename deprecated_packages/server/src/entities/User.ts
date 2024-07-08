import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dateOfBirth: string;

  @Column()
  city: string;

  @Column()
  gender: string;

  @Column()
  password: string;

  constructor() {
    super();
    this.name = '';
    this.dateOfBirth = '';
    this.email = '';
    this.gender = '';
    this.city = '';
    this.password = '';
  }
}
