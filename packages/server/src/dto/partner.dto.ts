import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({
    description: 'The image file for the partner.',
    type: 'string',
    format: 'binary',
  })
  image: Express.Multer.File;
}

export class UpdatePartnerDto {
  @ApiProperty({
    description: 'The updated image file for the partner.',
    type: 'string',
    format: 'binary',
  })
  image: Express.Multer.File;
}

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
