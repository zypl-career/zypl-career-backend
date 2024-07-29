import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateImageStorageDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  fileUrl: string;
}

export class UpdateImageStorageDto {
  @IsString()
  @IsOptional()
  filename?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  fileUrl?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
