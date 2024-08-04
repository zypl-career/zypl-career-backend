import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';
import {
  IArticleCreateDataDTO,
  IArticleUpdateDataDTO,
} from '../types/articles.js';
import { Transform } from 'class-transformer';

//----------------------------------------------------------------
// DTO ARTICLE CREATE
//----------------------------------------------------------------
export class CreateArticleDto implements IArticleCreateDataDTO {
  @ApiProperty({
    description: 'The title of the article',
    type: 'string',
  })
  @IsString({ message: 'title must be a string' })
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @ApiProperty({
    description: 'The description of the article',
    type: 'string',
  })
  @IsString({ message: 'description must be a string' })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file of the article',
  })
  image: Express.Multer.File;

  @ApiProperty({
    description: 'Minutes to read the article',
    type: 'integer',
  })
  @IsInt({ message: 'minutesRead must be an integer' })
  @Min(0, { message: 'minutesRead must be a positive integer' })
  minutesRead: number;

  @ApiProperty({
    description: 'General information about the article',
    type: 'string',
  })
  @IsString({ message: 'generalInfo must be a string' })
  @IsNotEmpty({ message: 'generalInfo is required' })
  generalInfo: string;

  @ApiProperty({
    description:
      'List of hashtags associated with the article, as a comma-separated string',
    type: String,
    example: 'hashtag1, hashtag2, hashtag3',
    isArray: true,
  })
  @IsString({ each: true, message: 'Each hashtag must be a string' })
  @ArrayNotEmpty({ message: 'Hashtags array should not be empty' })
  hashtags: string[];
}

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
    description: 'Minutes to read the article',
    type: 'integer',
    required: false,
  })
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
