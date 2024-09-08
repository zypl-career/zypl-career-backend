export type LessonModel = {
  id: string;
  item: number;
  type: 'pdf' | 'video';
  courseId: string;
  name: string;
  description: string;
  status: 'lock' | 'in_progress' | 'finish';
  resource: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
