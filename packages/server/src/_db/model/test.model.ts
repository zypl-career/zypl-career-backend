import { UserModel } from './user.model.js';

export type TestModel = {
  id: string;
  user: UserModel;
  resultTest: number[];
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
