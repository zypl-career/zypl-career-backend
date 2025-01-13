import { EnumRoles } from '../../user/type/index.js';
import { ArticleModel } from '../_db/model/index.js';

export interface IArticleCreateDataDTO {
  title: string;
  description: string;
  image: Express.Multer.File;
  type?: EnumRoles[];
  minutesRead: number;
  generalInfo: string;
  hashtags: string[];
}

export interface IArticleUpdateDataDTO {
  title?: string;
  description?: string;
  image?: Express.Multer.File;
  type?: EnumRoles[];
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

export enum IArticleSections {
  Partners = 'Partners',
  UniversitiesAndColleges = 'Universities and Colleges',
  Professions = 'Professions',
  Industries = 'Industries',
  EducationalCenters = 'Educational Centers',
  Courses = 'Courses',
  CareerArticles = 'Career Articles',
  JobSeekerResources = 'Resources for Job Seekers',
  UserGuideVideos = 'User Guide Videos',
  ParentArticles = 'Articles for Parents',
  TeacherAndPractitionerArticles = 'Articles for Teachers and Practitioners',
  HomepageArticles = 'Articles for Homepage',
}
