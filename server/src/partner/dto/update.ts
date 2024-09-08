import { ApiProperty } from '@nestjs/swagger';

export class UpdatePartnerDto {
  @ApiProperty({
    description: 'The updated image file for the partner.',
    type: 'string',
    format: 'binary',
  })
  image: Express.Multer.File;
}
