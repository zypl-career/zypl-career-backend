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
