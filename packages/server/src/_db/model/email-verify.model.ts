export type emailVerifyModel = {
  id: string;
  code: number;
  email: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
};
