import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { EnumCities, IUserLoginDataDTO } from '../types/_index.js';

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
    enum: ['male', 'female'],
  })
  @IsEnum(['male', 'female'], { message: 'gender must be male or female' })
  gender: 'male' | 'female';

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
    enum: ['student', 'teacher', 'parents'],
  })
  @IsEnum(['student', 'teacher', 'parents'], {
    message: 'role must be student, teacher or parents',
  })
  role: 'student' | 'teacher' | 'parents';

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

//----------------------------------------------------------------
// DTO USER UPDATE
//----------------------------------------------------------------
export class UpdateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'name must be a string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The surname of the user',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'surname must be a string' })
  @IsOptional()
  surname?: string;

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
    enum: ['male', 'female'],
    required: false,
  })
  @IsEnum(['male', 'female'], { message: 'gender must be male or female' })
  @IsOptional()
  gender?: 'male' | 'female';

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
    enum: ['student', 'teacher', 'parents'],
    required: false,
  })
  @IsEnum(['student', 'teacher', 'parents'], {
    message: 'role must be student, teacher or parents',
  })
  @IsOptional()
  role?: 'student' | 'teacher' | 'parents';

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
    required: false,
  })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'password must be a string' })
  @IsOptional()
  password?: string;
}

//----------------------------------------------------------------
// DTO USER GET
//----------------------------------------------------------------
export class GetUserDto {
  @ApiProperty({
    description: 'The name of the user',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'name must be a string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The surname of the user',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'surname must be a string' })
  @IsOptional()
  surname?: string;

  @ApiProperty({
    description: 'The gender of the user',
    type: 'string',
    enum: ['male', 'female'],
    required: false,
  })
  @IsEnum(['male', 'female'], { message: 'gender must be male or female' })
  @IsOptional()
  gender?: 'male' | 'female';

  @ApiProperty({
    description: 'The age of the user',
    type: 'number',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
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
    enum: ['student', 'teacher', 'parents'],
    required: false,
  })
  @IsEnum(['student', 'teacher', 'parents'], {
    message: 'role must be student, teacher or parents',
  })
  @IsOptional()
  role?: 'student' | 'teacher' | 'parents';

  @ApiProperty({
    description: 'The email of the user',
    type: 'string',
    required: false,
  })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsOptional()
  email?: string;

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

//----------------------------------------------------------------
// DTO USER GET
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
