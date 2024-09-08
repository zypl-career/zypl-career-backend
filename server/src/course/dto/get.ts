import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { ICoursesGetDto } from '../type/index.js';

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
