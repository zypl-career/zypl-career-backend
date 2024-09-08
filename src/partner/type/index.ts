export interface IPartnerCreateDataDTO {
  file: Express.Multer.File;
}

export interface IPartnerUpdateDataDTO {
  file?: Express.Multer.File;
}
