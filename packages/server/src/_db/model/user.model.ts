import { EnumCities } from '../../types/_index.js';

export type UserModel = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string;
  gender: 'male' | 'female';
  age?: number;
  district?: EnumCities;
  role: 'student' | 'teacher' | 'parents' | 'admin';
  school?: string;
  email: string;
  password: string;
  emailConfirmed?: boolean;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
