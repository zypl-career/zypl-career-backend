import { EnumCities } from '../../user/type/index.js';
import { UniversityModel } from '../_db/model/index.js';

export interface IUniversityCreateDataDTO {
  name: string;
  city: EnumCities;
  generalInfo: string;
}

export interface IUniversityUpdateDataDTO {
  name?: string;
  city?: EnumCities;
  generalInfo?: string;
}

export interface IUniversityGetDataDTO {
  name?: string;
  city?: EnumCities;
  page?: number;
  limit?: number;
}

export interface PaginatedUniversityResponse {
  total: number;
  page: number;
  limit: number;
  data: UniversityModel[];
}
