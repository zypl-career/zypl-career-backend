import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  IsArray,
  ArrayNotEmpty,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';
import {
  ICourseCreateDataDTO,
  ICourseUpdateDataDTO,
  ICoursesGetDto,
} from '../types/_index.js';
import { Transform } from 'class-transformer';

//----------------------------------------------------------------
// DTO COURSE CREATE
//----------------------------------------------------------------
export class CreateCourseDto implements ICourseCreateDataDTO {
  @ApiProperty({
    description: 'The title of the course',
    type: 'string',
  })
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @ApiProperty({
    description: 'The description of the course',
    type: 'string',
  })
  @IsString({ message: 'description must be a string' })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file of the course',
  })
  image: Express.Multer.File;

  @ApiProperty({
    description: 'Finished percentage of the course',
    type: 'integer',
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'finishedPercentage must be an integer' })
  @Min(0, { message: 'finishedPercentage must be a positive integer' })
  finishedPercentage: number;

  @ApiProperty({
    description: 'Tags associated with the course, as a comma-separated string',
    type: String,
    example: 'tag1, tag2, tag3',
  })
  @IsString({ each: true, message: 'Each tag must be a string' })
  @IsArray({ message: 'Tags must be an array of strings' })
  @ArrayNotEmpty({ message: 'Tags array should not be empty' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((tag) => tag.trim());
    }
    return value;
  })
  tags: string[];
}

//----------------------------------------------------------------
// DTO COURSE UPDATE
//----------------------------------------------------------------
export class UpdateCourseDto implements ICourseUpdateDataDTO {
  @ApiProperty({
    description: 'The title of the course',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  title?: string;

  @ApiProperty({
    description: 'The description of the course',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file of the course',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({
    description: 'Finished percentage of the course',
    type: 'integer',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt({ message: 'finishedPercentage must be an integer' })
  @Min(0, { message: 'finishedPercentage must be a positive integer' })
  finishedPercentage?: number;

  @ApiProperty({
    description: 'Tags associated with the course',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'tags must be an array of strings' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  tags?: string[];
}

//----------------------------------------------------------------
// DTO COURSE GET
//----------------------------------------------------------------
export class GetCoursesDto implements ICoursesGetDto {
  @ApiProperty({
    description: 'Title of the course to filter by (partial match)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  title?: string;

  @ApiProperty({
    description: 'Description of the course to filter by (partial match)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'Finished percentage of the course to filter by',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'finishedPercentage must be an integer' })
  @Min(0, { message: 'finishedPercentage must be a positive integer' })
  finishedPercentage?: number;

  @ApiProperty({
    description: 'Tags associated with the course to filter by',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'tags must be an array of strings' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  tags?: string[];

  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    type: Number,
    default: 1,
  })
  @IsOptional()
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be greater than or equal to 1' })
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    type: Number,
    default: 10,
  })
  @IsOptional()
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be greater than or equal to 1' })
  @Max(100, { message: 'limit must be less than or equal to 100' })
  limit?: number = 10;
}
