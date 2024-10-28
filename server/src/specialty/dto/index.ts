import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, isArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

import {
  ISpecialtyCreateDataDTO,
  ISpecialtyGetDataDTO,
  ISpecialtyUpdateDataDTO,
} from '../type/index.js';

//----------------------------------------------------------------
// DTO SPECIALTY CREATE
//----------------------------------------------------------------
export class CreateSpecialtyDto implements ISpecialtyCreateDataDTO {
  @ApiProperty({
    example: 'Computer Science',
    description: 'The name of the specialty',
  })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ApiProperty({
    example: 'EIOHPE123',
    description: 'Educational institutions of higher professional education',
  })
  @IsString({ message: 'EIOHPE must be a string' })
  EIOHPE: string;

  @ApiProperty({ example: 3, description: 'The class level of the specialty' })
  @IsInt({ message: 'class must be an integer' })
  @Min(1, { message: 'class must be at least 1' })
  class: number;

  @ApiProperty({
    example: 2,
    description: 'The specialization group of the specialty',
  })
  @IsInt({ message: 'specializationGroup must be an integer' })
  specializationGroup: 1 | 2 | 3 | 4 | 5;

  @ApiProperty({
    example: 'Engineering',
    description: 'The cluster name of the specialty',
  })
  @IsString({ message: 'clusterName must be a string' })
  clusterName: string;

  @ApiProperty({
    example: 'ENG',
    description: 'The cluster tag of the specialty',
  })
  @IsString({ message: 'clusterTag must be a string' })
  clusterTag: string;

  @ApiProperty({
    example: 'A specialization in computer science',
    description: 'The description of the specialty',
  })
  @IsString({ message: 'specialtyDescription must be a string' })
  specialtyDescription: string;

  @ApiProperty({ example: 101, description: 'The specialty code' })
  @IsInt({ message: 'specialtyCode must be an integer' })
  specialtyCode: number;

  @ApiProperty({
    example: 'Bachelor of Computer Science',
    description: 'The name of the specialty',
  })
  @IsString({ message: 'specialtyName must be a string' })
  specialtyName: string;

  @ApiProperty({ example: 'Full-time', description: 'The form of education' })
  @IsString({ message: 'formOfEducation must be a string' })
  formOfEducation: string;

  @ApiProperty({ example: 'On-campus', description: 'The type of study' })
  @IsString({ message: 'typeOfStudy must be a string' })
  typeOfStudy: string;

  @ApiProperty({ example: 'English', description: 'The language of study' })
  @IsString({ message: 'languageOfStudy must be a string' })
  languageOfStudy: string;

  @ApiProperty({
    example: 'XYZ University',
    description: 'The university name',
  })
  @IsString({ message: 'universityName must be a string' })
  universityName: string;

  @ApiProperty({
    example: 1000,
    description: 'The monthly income from the specialty',
  })
  @IsInt({ message: 'monthlyIncome must be an integer' })
  monthlyIncome: number;

  @ApiProperty({
    example: 5,
    description: 'The skills level required for the specialty',
  })
  @IsInt({ message: 'skillsLevel must be an integer' })
  skillsLevel: number;

  @ApiProperty({
    example: 'High',
    description: 'Future growth opportunities for the specialty',
  })
  @IsString({ message: 'futureGrowth must be a string' })
  futureGrowth: string;

  @ApiProperty({
    example: 'An overview of the specialty',
    description: 'The overview of the specialty',
  })
  @IsString({ message: 'overview must be a string' })
  overview: string;

  @ApiProperty({
    example: ['Software Development', 'Data Analysis'],
    description: 'Career opportunities available',
  })
  @IsArray({ message: 'careerOpportunities must be an array' })
  @ArrayNotEmpty({ message: 'careerOpportunities must not be empty' })
  careerOpportunities: string[];
}

//----------------------------------------------------------------
// DTO SPECIALTY UPDATE
//----------------------------------------------------------------
export class UpdateSpecialtyDto implements ISpecialtyUpdateDataDTO {
  @ApiProperty({
    example: 'Computer Science',
    description: 'The name of the specialty',
    required: false,
  })
  @IsString({ message: 'name must be a string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'EIOHPE123',
    description: 'Educational institutions of higher professional education',
    required: false,
  })
  @IsString({ message: 'EIOHPE must be a string' })
  @IsOptional()
  EIOHPE?: string;

  @ApiProperty({
    example: 3,
    description: 'The class level of the specialty',
    required: false,
  })
  @IsInt({ message: 'class must be an integer' })
  @Min(1, { message: 'class must be at least 1' })
  @IsOptional()
  class?: number;

  @ApiProperty({
    example: 2,
    description: 'The specialization group of the specialty',
    required: false,
  })
  @IsInt({ message: 'specializationGroup must be an integer' })
  @IsOptional()
  specializationGroup?: 1 | 2 | 3 | 4 | 5;

  @ApiProperty({
    example: 'Engineering',
    description: 'The cluster name of the specialty',
    required: false,
  })
  @IsString({ message: 'clusterName must be a string' })
  @IsOptional()
  clusterName?: string;

  @ApiProperty({
    example: 'ENG',
    description: 'The cluster tag of the specialty',
    required: false,
  })
  @IsString({ message: 'clusterTag must be a string' })
  @IsOptional()
  clusterTag?: string;

  @ApiProperty({
    example: 'A specialization in computer science',
    description: 'The description of the specialty',
    required: false,
  })
  @IsString({ message: 'specialtyDescription must be a string' })
  @IsOptional()
  specialtyDescription?: string;

  @ApiProperty({
    example: 101,
    description: 'The specialty code',
    required: false,
  })
  @IsInt({ message: 'specialtyCode must be an integer' })
  @IsOptional()
  specialtyCode?: number;

  @ApiProperty({
    example: 'Bachelor of Computer Science',
    description: 'The name of the specialty',
    required: false,
  })
  @IsString({ message: 'specialtyName must be a string' })
  @IsOptional()
  specialtyName?: string;

  @ApiProperty({
    example: 'Full-time',
    description: 'The form of education',
    required: false,
  })
  @IsString({ message: 'formOfEducation must be a string' })
  @IsOptional()
  formOfEducation?: string;

  @ApiProperty({
    example: 'On-campus',
    description: 'The type of study',
    required: false,
  })
  @IsString({ message: 'typeOfStudy must be a string' })
  @IsOptional()
  typeOfStudy?: string;

  @ApiProperty({
    example: 'English',
    description: 'The language of study',
    required: false,
  })
  @IsString({ message: 'languageOfStudy must be a string' })
  @IsOptional()
  languageOfStudy?: string;

  @ApiProperty({
    example: 'XYZ University',
    description: 'The university name',
    required: false,
  })
  @IsString({ message: 'universityName must be a string' })
  @IsOptional()
  universityName?: string;

  @ApiProperty({
    example: 1000,
    description: 'The monthly income from the specialty',
    required: false,
  })
  @IsInt({ message: 'monthlyIncome must be an integer' })
  @IsOptional()
  monthlyIncome?: number;

  @ApiProperty({
    example: 5,
    description: 'The skills level required for the specialty',
    required: false,
  })
  @IsInt({ message: 'skillsLevel must be an integer' })
  @IsOptional()
  skillsLevel?: number;

  @ApiProperty({
    example: 'High',
    description: 'Future growth opportunities for the specialty',
    required: false,
  })
  @IsString({ message: 'futureGrowth must be a string' })
  @IsOptional()
  futureGrowth?: string;

  @ApiProperty({
    example: 'An overview of the specialty',
    description: 'The overview of the specialty',
    required: false,
  })
  @IsString({ message: 'overview must be a string' })
  @IsOptional()
  overview?: string;

  @ApiProperty({
    example: ['Software Development', 'Data Analysis'],
    description: 'Career opportunities available',
    required: false,
  })
  @IsArray({ message: 'careerOpportunities must be an array' })
  @IsOptional()
  careerOpportunities?: string[];
}

//----------------------------------------------------------------
// DTO SPECIALTY GET
//----------------------------------------------------------------
export class getSpecialtyDTO implements ISpecialtyGetDataDTO {
  @ApiProperty({
    example: 'Computer Science',
    description: 'The name of the specialty',
    required: false,
  })
  @IsString({ message: 'name must be a string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 3,
    description: 'The class level of the specialty',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'class must be an integer' })
  @IsOptional()
  class?: number;

  @ApiProperty({
    example: 2,
    description: 'The specialization group of the specialty',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'specializationGroup must be an integer' })
  @IsOptional()
  specializationGroup?: 1 | 2 | 3 | 4 | 5;

  @ApiProperty({
    example: 'Engineering',
    description: 'The cluster name of the specialty',
    required: false,
  })
  @IsString({ message: 'clusterName must be a string' })
  @IsOptional()
  clusterName?: string;

  @ApiProperty({
    example: 'ENG',
    description: 'The cluster tag of the specialty',
    required: false,
  })
  @IsString({ message: 'clusterTag must be a string' })
  @IsOptional()
  clusterTag?: string;

  @ApiProperty({
    example: 101,
    description: 'The specialty code',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'specialtyCode must be an integer' })
  @IsOptional()
  specialtyCode?: number;

  @ApiProperty({
    example: 'Bachelor of Computer Science',
    description: 'The name of the specialty',
    required: false,
  })
  @IsString({ message: 'specialtyName must be a string' })
  @IsOptional()
  specialtyName?: string;

  @ApiProperty({
    example: 'Full-time',
    description: 'The form of education',
    required: false,
  })
  @IsString({ message: 'formOfEducation must be a string' })
  @IsOptional()
  formOfEducation?: string;

  @ApiProperty({
    example: 'On-campus',
    description: 'The type of study',
    required: false,
  })
  @IsString({ message: 'typeOfStudy must be a string' })
  @IsOptional()
  typeOfStudy?: string;

  @ApiProperty({
    example: 'English',
    description: 'The language of study',
    required: false,
  })
  @IsString({ message: 'languageOfStudy must be a string' })
  @IsOptional()
  languageOfStudy?: string;

  @ApiProperty({
    example: 'XYZ University',
    description: 'The university name',
    required: false,
  })
  @IsString({ message: 'universityName must be a string' })
  @IsOptional()
  universityName?: string;

  @ApiProperty({
    example: 1000,
    description: 'The monthly income from the specialty',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'monthlyIncome must be an integer' })
  @IsOptional()
  monthlyIncome?: number;

  @ApiProperty({
    example: ['Software Development', 'Data Analysis'],
    description: 'Career opportunities available',
    required: false,
  })
  @IsArray({ message: 'careerOpportunities must be an array' })
  @IsOptional()
  careerOpportunities?: string[];

  @ApiProperty({
    example: [4, 5, 3, 4, 5],
    description: 'Career sortSpecializationGroup available',
    required: false,
  })
  @IsArray({ message: 'sortSpecializationGroup must be an array' })
  @IsOptional()
  @Transform(({ value }) => {
    if (!isArray(value)) return [Number(value)];
    value.map((val) => Number(val));
  })
  sortSpecializationGroup?: number[];

  @ApiProperty({
    description: 'The page number for pagination',
    type: 'number',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'page must be an integer' })
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'The number of items per page for pagination',
    type: 'number',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'limit must be an integer' })
  @IsOptional()
  limit?: number;
}
