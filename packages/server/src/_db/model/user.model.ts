export type UserModel = {
  id: string;
  name: string;
  surname: string;
  patronymic?: string;
  gender: 'male' | 'female';
  age?: number;
  district?: string;
  role: 'student' | 'teacher' | 'parents';
  school?: string;
  email: string;
  password: string;
  createdAt: number;
  deletedAt: number;
};
