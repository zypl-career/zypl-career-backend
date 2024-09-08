import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { EnumCities, EnumGenders, EnumRoles } from '../type/index.js';

//----------------------------------------------------------------
// DTO USER CREATE
//----------------------------------------------------------------
export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    type: 'string',
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({
    description: 'The surname of the user',
    type: 'string',
  })
  @IsString({ message: 'surname must be a string' })
  @IsNotEmpty({ message: 'surname is required' })
  surname: string;

  @ApiProperty({
    description: 'The patronymic of the user',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'patronymic must be a string' })
  @IsOptional()
  patronymic?: string;

  @ApiProperty({
    description: 'The gender of the user',
    type: 'string',
    enum: EnumGenders,
  })
  @IsEnum(EnumGenders, { message: 'gender must be male or female' })
  gender: EnumGenders;

  @ApiProperty({
    description: 'The age of the user',
    type: 'number',
    required: false,
  })
  @IsInt({ message: 'age must be an integer' })
  @IsOptional()
  @Min(0, { message: 'age must be a positive integer' })
  @Max(120, { message: 'age must be less than 120' })
  age?: number;

  @ApiProperty({
    description: 'The district of the user',
    type: 'string',
    enum: EnumCities,
    required: false,
  })
  @IsEnum(EnumCities, {
    message: 'district must be a valid district',
  })
  @IsOptional()
  district?: EnumCities;

  @ApiProperty({
    description: 'The role of the user',
    type: 'string',
    enum: EnumRoles,
  })
  @IsEnum(EnumRoles, {
    message: 'role must be student, teacher or parents',
  })
  role: EnumRoles;

  @ApiProperty({
    description: 'The school of the user',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'school must be a string' })
  @IsOptional()
  school?: string;

  @ApiProperty({
    description: 'The email of the user',
    type: 'string',
  })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: 'string',
  })
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
