import { EnumRoles } from '../../../user/type/index.js';
import { IArticleSections } from '../../type/index.js';

export type ArticleModel = {
  id: string;
  title: string;
  description: string;
  type?: EnumRoles[];
  image: string;
  minutesRead: number;
  generalInfoFile: string;
  hashtags: string[];
  sections?: IArticleSections[];
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
