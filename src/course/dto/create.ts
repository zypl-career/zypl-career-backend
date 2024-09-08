import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Express } from 'express';

import { ICourseCreateDataDTO } from '../type/index.js';

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
