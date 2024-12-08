import { EnumCities, EnumGenders } from '../../type/index.js';

export type UserFastModel = {
  id: string;
  gender: EnumGenders;
  age?: number;
  district?: EnumCities;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
