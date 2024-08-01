export interface IEducationCenterCreateDataDTO {
  title: string;
  image?: Express.Multer.File;
  generalInfo: string;
  city: string;
}

export interface IEducationCenterUpdateDataDTO {
  title?: string;
  image?: Express.Multer.File;
  generalInfo?: string;
  city?: string;
}
