import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { IEducationCenterGetDataDTO } from '../type/index.js';

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
