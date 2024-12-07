import { EnumRoles } from "../../../user/type/index.js";

export type ArticleModel = {
  id: string;
  title: string;
  description: string;
  type?:EnumRoles
  image: string;
  minutesRead: number;
  generalInfoFile: string;
  hashtags: string[];
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
