export type ArticleModel = {
  id: string;
  title: string;
  description: string;
  image: string;
  minutesRead: number;
  generalInfoFile: string;
  hashtags: string[];
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
