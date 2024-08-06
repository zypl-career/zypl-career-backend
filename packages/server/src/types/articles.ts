import { ArticlesModel } from '../_db/model/articles.model.js';

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
  data: ArticlesModel[];
}
