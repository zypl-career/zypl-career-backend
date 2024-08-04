import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResultModalDto {
  @ApiProperty({ example: 'Sample Name', description: 'The name' })
  @IsString()
  name: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Array of numbers' })
  @IsArray()
  first: number[];

  @ApiProperty({ example: ['a', 'b'], description: 'Array of strings' })
  @IsArray()
  second: string[];

  @ApiProperty({ example: 'Sample String', description: 'A string value' })
  @IsString()
  third: string;

  @ApiProperty({ example: 'Sample String', description: 'A string value' })
  @IsString()
  fourth: string;

  @ApiProperty({ example: 'Sample String', description: 'A string value' })
  @IsString()
  fifth: string;

  @ApiProperty({ example: 'Sample String', description: 'A string value' })
  @IsString()
  sixth: string;

  @ApiProperty({ example: 'Sample String', description: 'A string value' })
  @IsString()
  seventh: string;

  @ApiProperty({ example: 120, description: 'Time spent' })
  @IsNumber()
  time_spent: number;
}
