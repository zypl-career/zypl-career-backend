import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  IsArray,
  ArrayNotEmpty,
  Max,
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
  @Transform(({ value }) => parseInt(value, 10))
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
  })
  @IsString({ each: true, message: 'Each hashtag must be a string' })
  @IsArray({ message: 'Hashtags must be an array of strings' })
  @ArrayNotEmpty({ message: 'Hashtags array should not be empty' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((tag) => tag.trim());
    }
    return value;
  })
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

//----------------------------------------------------------------
// DTO ARTICLE GET
//----------------------------------------------------------------
export class GetArticlesDto {
  @ApiProperty({
    description: 'Title of the article to filter by (partial match)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  title?: string;

  @ApiProperty({
    description: 'Description of the article to filter by (partial match)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @ApiProperty({
    description: 'Minutes to read the article to filter by',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'minutesRead must be an integer' })
  @Min(0, { message: 'minutesRead must be a positive integer' })
  minutesRead?: number;

  @ApiProperty({
    description:
      'General information about the article to filter by (partial match)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'generalInfo must be a string' })
  generalInfo?: string;

  @ApiProperty({
    description: 'List of hashtags associated with the article to filter by',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'hashtags must be an array of strings' })
  @IsString({ each: true, message: 'Each hashtag must be a string' })
  hashtags?: string[];

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
