import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

import { EnumCities, EnumRoles } from '../type/index.js';

export class UpdateUserFastDto {
  @ApiProperty({
    description: 'The gender of the user',
    type: 'string',
    enum: EnumRoles,
    required: false,
  })
  @IsEnum(EnumRoles, { message: 'gender must be male or female' })
  @IsOptional()
  gender?: EnumRoles;

  @ApiProperty({
    description: 'The age of the user',
    type: 'number',
    required: false,
  })
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
}
