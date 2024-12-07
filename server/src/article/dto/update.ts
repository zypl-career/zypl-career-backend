import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Express } from 'express';

import { IArticleUpdateDataDTO } from '../type/index.js';
import { EnumRoles } from '../../user/type/index.js';

//----------------------------------------------------------------
// DTO ARTICLE UPDATE
//----------------------------------------------------------------
export class UpdateArticleDto implements IArticleUpdateDataDTO {
  @ApiProperty({
    description: 'The title of the article',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  title?: string;

  @ApiProperty({
    description: 'The description of the article',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file of the article',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File; // File uploads are not validated by class-validator directly

  @ApiProperty({
    description: 'The role type of the article',
    type: 'string',
    enum: EnumRoles,
  })
  @IsOptional()
  @IsEnum(EnumRoles, { message: 'type must be a valid role' })
  type?: EnumRoles; 


  @ApiProperty({
    description: 'Minutes to read the article',
    type: 'integer',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt({ message: 'minutesRead must be an integer' })
  @Min(0, { message: 'minutesRead must be a positive integer' })
  minutesRead?: number;

  @ApiProperty({
    description: 'General information about the article',
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'generalInfo must be a string' })
  generalInfo?: string;

  @ApiProperty({
    description: 'List of hashtags associated with the article',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'hashtags must be an array of strings' })
  @IsString({ each: true, message: 'Each hashtag must be a string' })
  hashtags?: string[];
}
