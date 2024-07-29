import { IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IPartnerCreateDataDTO,
  IPartnerUpdateDataDTO,
} from '../types/partner.js';

//----------------------------------------------------------------
// DTO PARTNER CREATE
//----------------------------------------------------------------
export class CreatePartnerDto implements IPartnerCreateDataDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file of the partner',
  })
  @IsUrl({}, { message: 'image must be a valid URL' })
  file: Express.Multer.File;
}

//----------------------------------------------------------------
// DTO PARTNER UPDATE
//----------------------------------------------------------------
export class UpdatePartnerDto implements IPartnerUpdateDataDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file of the partner',
    required: false,
  })
  @IsUrl({}, { message: 'image must be a valid URL' })
  @IsOptional()
  file?: Express.Multer.File;
}
