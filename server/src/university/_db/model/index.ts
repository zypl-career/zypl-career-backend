import { EnumCities } from '../../../user/type/index.js';

export type UniversityModel = {
  id: string;
  name: string;
  city: EnumCities;
  generalInfoFile: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
