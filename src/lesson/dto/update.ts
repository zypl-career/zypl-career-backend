import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Express } from 'express';

import { ILessonUpdateDataDTO } from '../type/index.js';

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
    description: 'The resource file associated with the lesson',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  resource?: Express.Multer.File;
}
