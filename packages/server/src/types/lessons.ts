export interface ILessonCreateDataDTO {
  courseId: string;
  name: string;
  description: string;
  resource: Express.Multer.File;
}

export interface ILessonUpdateDataDTO {
  courseId?: string;
  name?: string;
  description?: string;
  status?: 'lock' | 'in_progress' | 'finish';
  resource?: Express.Multer.File;
}

export interface ILessonsGetDto {
  name?: string;
  description?: string;
  status?: 'lock' | 'in_progress' | 'finish';
  page?: number;
  limit?: number;
}

export type IGetLessonByCourseId = {
  id: string;
  item: number;
  name: string;
  status: 'lock' | 'in_progress' | 'finish';
  type: 'video' | 'pdf';
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
}[];

export type ISubmitLesson = {
  nextLessonId: string | null;
  nextLessonItem: number | null;
}[];

export interface PaginatedLessonsResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}
