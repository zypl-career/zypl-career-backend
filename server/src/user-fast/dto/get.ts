import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

import { EnumCities, EnumGenders } from '../type/index.js';

export class GetUserFastDto {
  @ApiProperty({
    description: 'The gender of the user',
    type: 'string',
    enum: EnumGenders,
    required: false,
  })
  @IsEnum(EnumGenders, { message: 'gender must be male or female' })
  @IsOptional()
  gender?: EnumGenders;

  @ApiProperty({
    description: 'The age of the user',
    type: 'number',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'age must be an integer' })
  @IsOptional()
  @Min(0, { message: 'age must be a positive integer' })
  @Max(120, { message: 'age must be less than 120' })
  age?: number;

  @ApiProperty({
    description: 'The district of the user',
    type: 'string',
    enum: EnumCities,
    required: false,
  })
  @IsEnum(EnumCities, {
    message: 'district must be a valid district',
  })
  @IsOptional()
  district?: EnumCities;

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
