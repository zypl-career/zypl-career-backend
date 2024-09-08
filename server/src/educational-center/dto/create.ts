import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Express } from 'express';

import { IEducationCenterCreateDataDTO } from '../type/index.js';

//----------------------------------------------------------------
// DTO EDUCATION CENTER CREATE
//----------------------------------------------------------------
export class CreateEducationCenterDto implements IEducationCenterCreateDataDTO {
  @ApiProperty({
    description: 'The title of the education center',
    type: 'string',
  })
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file of the education center',
  })
  @IsOptional()
  image: Express.Multer.File;

  @ApiProperty({
    description: 'The general information about the education center',
    type: 'string',
  })
  @IsString({ message: 'generalInfo must be a string' })
  @IsNotEmpty({ message: 'generalInfo is required' })
  generalInfo: string;

  @ApiProperty({
    description: 'The city where the education center is located',
    type: 'string',
  })
  @IsString({ message: 'city must be a string' })
  @IsNotEmpty({ message: 'city is required' })
  city: string;
}
