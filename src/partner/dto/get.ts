import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetPartnersDto {
  @ApiPropertyOptional({
    description: 'Number of items per page.',
    type: Number,
    example: 10,
  })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Page number for pagination.',
    type: Number,
    example: 1,
  })
  @IsOptional()
  page?: number;
}
