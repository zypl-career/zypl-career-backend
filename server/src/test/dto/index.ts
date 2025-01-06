import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

// ---------------------------------------------------------------------------
// CREATE TEST
// ---------------------------------------------------------------------------
export class createTestModalDto {
  @ApiProperty({ example: 'Sample Name', description: 'The name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: [
      1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ],
    description: 'Array of numbers',
  })
  @IsArray()
  first: number[];

  @ApiProperty({
    example: [
      'Chemistry',
      'Botany',
      'Advice on work',
      'Helping families in need',
      'Doktor',
      'Music',
      'Physics',
      'Education',
      'Artist / Folk Crafts',
      'Child care',
      'Landscaping',
      'Travel agent',
      'Picture description',
      'The nurse of mercy',
      'Economist',
      'Geology',
      'Economist',
      'Helping patients in the hospital',
    ],
    description: 'Array of strings',
  })
  @IsArray()
  second: string[];

  @ApiProperty({
    example: 'We had money for food, but buying clothes was a big problem for us',
    description: 'A string value',
  })
  @IsString()
  third: string;

  @ApiProperty({
    example: 'Work as an employee or assistant on a farm (farm, h',
    description: 'A string value',
  })
  @IsString()
  fourth: string;

  @ApiProperty({
    example: "I don't know / Rejection",
    description: 'A string value',
  })
  @IsString()
  fifth: string;

  @ApiProperty({
    example: 'Does not work due to limited physical ability or illness',
    description: 'A string value',
  })
  @IsString()
  sixth: string;

  @ApiProperty({
    example: 'Higher education (University, Conservatory, Academy) or Postgraduate studies, etc',
    description: 'A string value',
  })
  @IsString()
  seventh: string;

  @ApiProperty({ example: 120, description: 'Time spent' })
  @IsNumber()
  time_spent: number;
}

// ---------------------------------------------------------------------------
// TEST GET
// ---------------------------------------------------------------------------
export class getTestDTO {
  @ApiProperty({
    description: 'The userId for get result by userId',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'userId must be a string' })
  @IsOptional()
  userId?: string;

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

export class getInfoTestDTO {
  @ApiProperty({
    description: 'The email for get result by email',
    type: 'string',
    required: false,
  })
  @IsString({ message: 'email must be a string' })
  @IsOptional()
  email?: string;
}
