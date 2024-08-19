import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  IsEnum,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';
import {
  ILessonCreateDataDTO,
  ILessonUpdateDataDTO,
  ILessonsGetDto,
} from '../types/_index.js';
import { Transform } from 'class-transformer';

//----------------------------------------------------------------
// DTO LESSON CREATE
//----------------------------------------------------------------
export class CreateLessonDto implements ILessonCreateDataDTO {
  @ApiProperty({
    description: 'The course ID to which the lesson belongs',
    type: 'string',
  })
  @IsString({ message: 'courseId must be a string' })
  @IsNotEmpty({ message: 'courseId is required' })
  courseId: string;

  @ApiProperty({
    description: 'The name of the lesson',
    type: 'string',
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({
    description: 'The description of the lesson',
    type: 'string',
  })
  @IsString({ message: 'description must be a string' })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @ApiProperty({
    description: 'The status of the lesson',
    enum: ['lock', 'in_progress', 'finish'],
  })
  @IsEnum(['lock', 'in_progress', 'finish'], {
    message: 'status must be one of: lock, in_progress, finish',
  })
  status: 'lock' | 'in_progress' | 'finish';

  @ApiProperty({
    description: 'The resource file associated with the lesson',
    type: 'string',
    format: 'binary',
  })
  resource: Express.Multer.File;
}

//----------------------------------------------------------------
// DTO LESSON UPDATE
//----------------------------------------------------------------
export class UpdateLessonDto implements ILessonUpdateDataDTO {
  @ApiProperty({
    description: 'The course ID to which the lesson belongs',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'courseId must be a string' })
  courseId?: string;

  @ApiProperty({
    description: 'The name of the lesson',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  name?: string;

  @ApiProperty({
    description: 'The description of the lesson',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'The status of the lesson',
    enum: ['lock', 'in_progress', 'finish'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['lock', 'in_progress', 'finish'], {
    message: 'status must be one of: lock, in_progress, finish',
  })
  status?: 'lock' | 'in_progress' | 'finish';

  @ApiProperty({
    description: 'The resource file associated with the lesson',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  resource?: Express.Multer.File;
}

//----------------------------------------------------------------
// DTO LESSON GET
//----------------------------------------------------------------
export class GetLessonsDto implements ILessonsGetDto {
  @ApiProperty({
    description: 'Name of the lesson to filter by (partial match)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  name?: string;

  @ApiProperty({
    description: 'Description of the lesson to filter by (partial match)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'Status of the lesson to filter by',
    required: false,
    enum: ['lock', 'in_progress', 'finish'],
  })
  @IsOptional()
  @IsEnum(['lock', 'in_progress', 'finish'], {
    message: 'status must be one of: lock, in_progress, finish',
  })
  status?: 'lock' | 'in_progress' | 'finish';

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
