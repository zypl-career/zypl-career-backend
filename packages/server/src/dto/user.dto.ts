import {
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsIn,
  IsEmail,
  Length,
  IsEnum,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  IUserCreateDataDTO,
  IUserLoginDataDTO,
  IUserUpdateDataDTO,
} from '../types/user.js';

//----------------------------------------------------------------
// DTO USER CREATE
//----------------------------------------------------------------
export class CreateUserDto implements IUserCreateDataDTO {
  @ApiProperty({ example: 'Doe', description: 'The surname of the user' })
  @IsString({ message: 'surname must be a string' })
  surname: string;

  @ApiProperty({
    example: 'John',
    description: 'The patronymic of the user',
    required: false,
  })
  @IsString({ message: 'patronymic must be a string' })
  @IsOptional()
  patronymic?: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender of the user',
    enum: ['male', 'female'],
  })
  @IsIn(['male', 'female'], { message: 'gender must be either male or female' })
  gender: 'male' | 'female';

  @ApiProperty({
    example: 25,
    description: 'The age of the user',
    required: false,
  })
  @IsInt({ message: 'age must be an integer' })
  @Min(1, { message: 'age must be at least 1' })
  @Max(120, { message: 'age must be at most 120' })
  @IsOptional()
  age?: number;

  @ApiProperty({
    example: 'Central',
    description: 'The district of the user',
    required: false,
  })
  @IsString({ message: 'district must be a string' })
  @IsOptional()
  district?: string;

  @ApiProperty({
    example: 'student',
    description: 'The role of the user',
    enum: ['student', 'teacher', 'parents'],
  })
  @IsIn(['student', 'teacher', 'parents'], {
    message: 'role must be either student, teacher, or parents',
  })
  role: 'student' | 'teacher' | 'parents';

  @ApiProperty({
    example: 'Central High',
    description: 'The school of the user',
    required: false,
  })
  @IsString({ message: 'school must be a string' })
  @IsOptional()
  school?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    minLength: 8,
    maxLength: 20,
  })
  @IsString({ message: 'password must be a string' })
  @Length(8, 20, { message: 'password must be between 8 and 20 characters' })
  password: string;

  @ApiProperty({ example: 'John', description: 'The name of the user' })
  @IsString({ message: 'name must be a string' })
  name: string;
}

//----------------------------------------------------------------
//DTO USER UPDATE
//----------------------------------------------------------------
export class UpdateUserDto implements IUserUpdateDataDTO {
  @ApiProperty({
    example: 'Doe',
    description: 'The surname of the user',
    required: false,
  })
  @IsString({ message: 'surname must be a string' })
  @IsOptional()
  surname?: string;

  @ApiProperty({
    example: 'John',
    description: 'The patronymic of the user',
    required: false,
  })
  @IsString({ message: 'patronymic must be a string' })
  @IsOptional()
  patronymic?: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender of the user',
    enum: ['male', 'female'],
    required: false,
  })
  @IsIn(['male', 'female'], { message: 'gender must be either male or female' })
  @IsOptional()
  gender?: 'male' | 'female';

  @ApiProperty({
    example: 25,
    description: 'The age of the user',
    required: false,
  })
  @IsInt({ message: 'age must be an integer' })
  @Min(1, { message: 'age must be at least 1' })
  @Max(120, { message: 'age must be at most 120' })
  @IsOptional()
  age?: number;

  @ApiProperty({
    example: 'Central',
    description: 'The district of the user',
    required: false,
  })
  @IsString({ message: 'district must be a string' })
  @IsOptional()
  district?: string;

  @ApiProperty({
    example: 'student',
    description: 'The role of the user',
    enum: ['student', 'teacher', 'parents'],
    required: false,
  })
  @IsIn(['student', 'teacher', 'parents'], {
    message: 'role must be either student, teacher, or parents',
  })
  @IsOptional()
  role?: 'student' | 'teacher' | 'parents';

  @ApiProperty({
    example: 'Central High',
    description: 'The school of the user',
    required: false,
  })
  @IsString({ message: 'school must be a string' })
  @IsOptional()
  school?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
    required: false,
  })
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    minLength: 8,
    maxLength: 20,
    required: false,
  })
  @IsString({ message: 'password must be a string' })
  @Length(8, 20, { message: 'password must be between 8 and 20 characters' })
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: 'John',
    description: 'The name of the user',
    required: false,
  })
  @IsString({ message: 'name must be a string' })
  @IsOptional()
  name?: string;
}

//----------------------------------------------------------------
//DTO USER LOGIN
//----------------------------------------------------------------
export class LoginUserDto implements IUserLoginDataDTO {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString({ message: 'password must be a string' })
  password: string;
}

//----------------------------------------------------------------
//DTO USER PAGINATION
//----------------------------------------------------------------

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: 'male' | 'female';

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsEnum(['student', 'teacher', 'parents'])
  role?: 'student' | 'teacher' | 'parents';

  @IsOptional()
  @IsString()
  school?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
