import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { EnumRoles } from '../../user/type/index.js';
import { IArticleSections } from '../type/index.js';

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
    description: 'The role types associated with the article',
    type: 'string',
    isArray: true,
    enum: EnumRoles,
  })
  @IsOptional()
  @IsEnum(EnumRoles, { each: true, message: 'Each type must be a valid role' })
  type?: EnumRoles[];

  @ApiProperty({
    description: 'General information about the article to filter by (partial match)',
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
    description: 'Sections of the article to filter by',
    required: false,
    type: [String],
    enum: IArticleSections,
  })
  @IsOptional()
  @IsArray({ message: 'Sections must be an array of valid sections' })
  @IsEnum(IArticleSections, { each: true, message: 'Each section must be a valid section' })
  sections?: IArticleSections[];

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
