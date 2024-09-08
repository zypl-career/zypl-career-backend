import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { ILessonGetDto } from '../type/index.js';

//----------------------------------------------------------------
// DTO LESSON GET
//----------------------------------------------------------------
export class GetLessonDto implements ILessonGetDto {
  @ApiProperty({
    description: 'Name of the lesson to filter by (partial match)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  name?: string;

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
    description: 'type of the lesson to filter by',
    required: false,
    enum: ['pdf', 'video'],
  })
  @IsOptional()
  @IsEnum(['pdf', 'video'], {
    message: 'type must be one of: pdf, video',
  })
  type?: 'pdf' | 'video';

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
