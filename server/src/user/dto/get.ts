import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { EnumCities, EnumGenders, EnumRoles } from '../type/index.js';

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
    enum: EnumGenders,
    required: false,
  })
  @IsEnum(EnumGenders, { message: 'gender must be male or female' })
  @IsOptional()
  gender?: EnumGenders;

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
    enum: EnumRoles,
    required: false,
  })
  @IsEnum(EnumRoles, {
    message: 'role must be student, teacher or parents',
  })
  @IsOptional()
  role?: EnumRoles;

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
