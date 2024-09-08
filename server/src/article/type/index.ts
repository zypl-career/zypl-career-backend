import { ArticleModel } from '../_db/model/index.js';

export interface IArticleCreateDataDTO {
  title: string;
  description: string;
  image: Express.Multer.File;
  minutesRead: number;
  generalInfo: string;
  hashtags: string[];
}

export interface IArticleUpdateDataDTO {
  title?: string;
  description?: string;
  image?: Express.Multer.File;
  minutesRead?: number;
  generalInfo?: string;
  hashtags?: string[];
}

export interface PaginatedArticlesResponse {
  total: number;
  page: number;
  limit: number;
  data: ArticleModel[];
}
