import { UserModel } from '../_db/model/_index.js';
import { EnumCities } from './_index.js';

export interface IUserCreateDataDTO {
  name: string;
  surname: string;
  patronymic?: string;
  gender: TGender;
  age?: number;
  district?: EnumCities;
  role: TRole;
  school?: string;
  email: string;
  password: string;
}

export interface IUserUpdateDataDTO {
  name?: string;
  surname?: string;
  patronymic?: string;
  gender?: TGender;
  age?: number;
  district?: EnumCities;
  role?: TRole;
  school?: string;
  email?: string;
  password?: string;
}

export interface IUserLoginDataDTO {
  email: string;
  password: string;
}

export type TGender = 'male' | 'female';

export type TRole = 'student' | 'teacher' | 'parents';

export interface IUserLoginResult {
  access: string;
  refresh: string;
}

export interface PaginationResult<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PaginatedUserResponse {
  total: number;
  page: number;
  limit: number;
  data: UserModel[];
}
