import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  EnumCities,
  IUniversityCreateDataDTO,
  IUniversityGetDataDTO,
  IUniversityUpdateDataDTO,
} from '../types/_index.js';
import { Transform } from 'class-transformer';

//----------------------------------------------------------------
// DTO UNIVERSITY CREATE
//----------------------------------------------------------------
export class CreateUniversityDto implements IUniversityCreateDataDTO {
  @ApiProperty({
    example: 'Tajik National University',
    description: 'The name of the university',
  })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ApiProperty({
    example: 'Dushanbe',
    description: 'The city of the university',
    enum: EnumCities,
    required: false,
  })
  @IsEnum(EnumCities, {
    message: 'city must be a valid city [' + Object.values(EnumCities) + ']',
  })
  city: EnumCities;

  @ApiProperty({
    example: 'general_info.pdf',
    description: 'The general info file of the university',
  })
  @IsString({ message: 'generalInfoFile must be a string' })
  generalInfo: string;
}

//----------------------------------------------------------------
// DTO UNIVERSITY UPDATE
//----------------------------------------------------------------
export class UpdateUniversityDto implements IUniversityUpdateDataDTO {
  @ApiProperty({
    example: 'Tajik National University',
    description: 'The name of the university',
    required: false,
  })
  @IsString({ message: 'name must be a string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Dushanbe',
    description: 'The city of the university',
    enum: EnumCities,
    required: false,
  })
  @IsEnum(EnumCities, {
    message: 'district must be a valid district',
  })
  @IsOptional()
  city?: EnumCities;

  @ApiProperty({
    example: 'general_info.pdf',
    description: 'The general info file of the university',
    required: false,
  })
  @IsString({ message: 'generalInfoFile must be a string' })
  @IsOptional()
  generalInfo?: string;
}

//----------------------------------------------------------------
// DTO UNIVERSITY GET
//----------------------------------------------------------------
export class getUniversityDTO implements IUniversityGetDataDTO {
  @ApiProperty({
    description: 'The name of the university',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'name must be a string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The city of the university',
    type: 'string',
    enum: EnumCities,
    required: false,
  })
  @IsEnum(EnumCities, {
    message: 'city must be [' + Object.values(EnumCities) + ']',
  })
  @IsOptional()
  gender?: EnumCities;

  @ApiProperty({
    description: 'The page number for pagination',
    type: 'number',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'page must be an integer' })
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'The number of items per page for pagination',
    type: 'number',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'limit must be an integer' })
  @IsOptional()
  limit?: number;
}
