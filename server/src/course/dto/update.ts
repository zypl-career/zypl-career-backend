import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Express } from 'express';

import { ICourseUpdateDataDTO } from '../type/index.js';

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
