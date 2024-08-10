import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';
import {
  IEducationCenterCreateDataDTO,
  IEducationCenterGetDataDTO,
  IEducationCenterUpdateDataDTO,
} from '../types/educational-centers.js';
import { Transform } from 'class-transformer';

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

//----------------------------------------------------------------
// DTO EDUCATION CENTER GET
//----------------------------------------------------------------
export class GetEducationCenterDto implements IEducationCenterGetDataDTO {
  @ApiProperty({
    description: 'title of the education center to filter by (partial match)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  title?: string;

  @ApiProperty({
    description: 'city of the education center to filter',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'city must be a string' })
  city?: string;

  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    type: Number,
    default: 1,
  })
  @Transform(({ value }) => parseInt(value, 10))
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
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be greater than or equal to 1' })
  @Max(100, { message: 'limit must be less than or equal to 100' })
  limit?: number = 10;
}
