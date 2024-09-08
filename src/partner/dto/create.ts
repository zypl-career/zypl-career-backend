import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto {
  @ApiProperty({
    description: 'The image file for the partner.',
    type: 'string',
    format: 'binary',
  })
  image: Express.Multer.File;
}
