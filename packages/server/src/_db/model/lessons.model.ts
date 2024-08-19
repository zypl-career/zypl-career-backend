export type LessonsModel = {
  id: string;
  item: number;
  courseId: string;
  name: string;
  description: string;
  status: 'lock' | 'in_progress' | 'finish';
  resource: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};

type getLessonByCourseId = {
  id: string;
  item: number;
  name: string;
  status: 'lock' | 'in_progress' | 'finish';
  type: 'video' | 'pdf'; //if resource is video then vide else pdf
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
}[];

type submitLesson = {
  nextLessonId: string;
  nextLessonItem: number;
}[];
