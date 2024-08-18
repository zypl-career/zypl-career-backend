export interface ICourseCreateDataDTO {
  title: string;
  description: string;
  image: Express.Multer.File;
  finishedPercentage: number;
  tags: string[];
}

export interface ICourseUpdateDataDTO {
  title?: string;
  description?: string;
  image?: Express.Multer.File;
  finishedPercentage?: number;
  tags?: string[];
}

export interface ICoursesGetDto {
  title?: string;
  description?: string;
  finishedPercentage?: number;
  tags?: string[];
  page?: number;
  limit?: number;
}
