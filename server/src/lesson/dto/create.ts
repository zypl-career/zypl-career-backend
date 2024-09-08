import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Express } from 'express';

import { ILessonCreateDataDTO } from '../type/index.js';

//----------------------------------------------------------------
// DTO LESSON CREATE
//----------------------------------------------------------------
export class CreateLessonDto implements ILessonCreateDataDTO {
  status: 'lock' | 'in_progress' | 'finish';
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
    description: 'The resource file associated with the lesson',
    type: 'string',
    format: 'binary',
  })
  resource: Express.Multer.File;
}
