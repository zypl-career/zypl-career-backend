import { EnumCities } from '../../types/_index.js';

export type UniversityModel = {
  id: string;
  name: string;
  city: EnumCities;
  generalInfoFile: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
