import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MmtSpecialty extends BaseEntity {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  index: number;
  @Column()
  id: number;
  @Column()
  education: string;
  @Column()
  grade: number;
  @Column()
  specialization_group: number;
  @Column()
  cluster_name: string;
  @Column()
  tag_by_cluster: string;
  @Column()
  specialty_description: string;
  @Column()
  tag_by_specialty: string;
  @Column()
  specialty_code: number;
  @Column()
  name_of_specialty: string;
  @Column()
  form_of_education: string;
  @Column()
  type_of_education: string;
  @Column()
  tuition_fee_in_somoni: number;
  @Column()
  language_of_education: string;
  @Column()
  name_of_educational_institution: string;
  constructor() {
    super();
    this.id = 0;
    this.education = '';
    this.grade = 0;
    this.specialization_group = 0;
    this.cluster_name = '';
    this.tag_by_cluster = '';
    this.specialty_description = '';
    this.tag_by_specialty = '';
    this.specialty_code = 0;
    this.name_of_specialty = '';
    this.form_of_education = '';
    this.type_of_education = '';
    this.tuition_fee_in_somoni = 0;
    this.language_of_education = '';
    this.name_of_educational_institution = '';
  }
}
