import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
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
  image?: Express.Multer.File;

  @ApiProperty({
    description: 'The role types associated with the article',
    type: 'string',
    isArray: true,
    enum: EnumRoles,
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Type must be an array of roles' })
  @IsEnum(EnumRoles, { each: true, message: 'Each type must be a valid role' })
  @ArrayNotEmpty({ message: 'At least one role type must be provided' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((role) => role.trim() as EnumRoles);
    }
    return value;
  })
  type?: EnumRoles[];

  @ApiProperty({
    description: 'Minutes to read the article',
    type: 'integer',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'minutesRead must be an integer' })
  @IsOptional()
  @Min(0, { message: 'minutesRead must be a positive integer' })
  minutesRead: number;

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
  @IsString({ each: true, message: 'Each hashtag must be a string' })
  @IsArray({ message: 'Hashtags must be an array of strings' })
  @ArrayNotEmpty({ message: 'Hashtags array should not be empty' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((tag) => tag.trim());
    }
    return value;
  })
  hashtags?: string[];
}
