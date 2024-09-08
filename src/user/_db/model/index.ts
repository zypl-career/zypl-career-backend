import { EnumCities, EnumGenders, EnumRoles } from '../../type/index.js';

export type UserModel = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string;
  gender: EnumGenders;
  age?: number;
  district?: EnumCities;
  role: EnumRoles;
  school?: string;
  email: string;
  password: string;
  emailConfirmed?: boolean;
  accept?: string[];
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
