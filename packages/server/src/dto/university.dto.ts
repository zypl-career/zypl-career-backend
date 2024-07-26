import { IsString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  IUniversityCreateDataDTO,
  IUniversityUpdateDataDTO,
} from '../types/_index.js';

//----------------------------------------------------------------
// DTO UNIVERSITY CREATE
//----------------------------------------------------------------
export class CreateUniversityDto implements IUniversityCreateDataDTO {
  @ApiProperty({
    example: 'Harvard',
    description: 'The name of the university',
  })
  @IsString({ message: 'name must be a string' })
  name: string;

  @ApiProperty({
    example: 'Cambridge',
    description: 'The city of the university',
  })
  @IsString({ message: 'city must be a string' })
  city: string;

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
    example: 'Harvard',
    description: 'The name of the university',
    required: false,
  })
  @IsString({ message: 'name must be a string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Cambridge',
    description: 'The city of the university',
    required: false,
  })
  @IsString({ message: 'city must be a string' })
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: 'general_info.pdf',
    description: 'The general info file of the university',
    required: false,
  })
  @IsString({ message: 'generalInfoFile must be a string' })
  @IsOptional()
  generalInfo?: string;
}
