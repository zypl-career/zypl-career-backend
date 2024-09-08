import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Express } from 'express';

import { IEducationCenterUpdateDataDTO } from '../type/index.js';

//----------------------------------------------------------------
// DTO EDUCATION CENTER UPDATE
//----------------------------------------------------------------
export class UpdateEducationCenterDto implements IEducationCenterUpdateDataDTO {
  @ApiProperty({
    description: 'The title of the education center',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  title?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file of the education center',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File; // File uploads are not validated by class-validator directly

  @ApiProperty({
    description: 'The general information about the education center',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'generalInfo must be a string' })
  generalInfo?: string;

  @ApiProperty({
    description: 'The city where the education center is located',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'city must be a string' })
  city?: string;
}
