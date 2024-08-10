import { EducationCenterModel } from '../_db/model/educational-centers.model.js';

export interface IEducationCenterCreateDataDTO {
  title: string;
  image: Express.Multer.File;
  generalInfo: string;
  city: string;
}

export interface IEducationCenterUpdateDataDTO {
  title?: string;
  image?: Express.Multer.File;
  generalInfo?: string;
  city?: string;
}

export interface IEducationCenterGetDataDTO {
  title?: string;
  city?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedEducationCenterResponse {
  total: number;
  page: number;
  limit: number;
  data: EducationCenterModel[];
}
