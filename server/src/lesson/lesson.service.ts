import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { appConfig } from '../app.config.js';
import { CourseRepository } from '../course/_db/repository/index.js';
import { PdfService } from '../pdf/pdf.service.js';
import { IError, IMessage, IValidation } from '../type/base.js';
import { formatValidationErrors, validateUUID } from '../util/index.js';
import { VideoService } from '../video/video.service.js';

import { LessonModel } from './_db/model/index.js';
import { LessonRepository } from './_db/repository/index.js';
import { CreateLessonDto, GetLessonDto, UpdateLessonDto } from './dto/index.js';
import {
  IGetLessonByCourseId,
  ILessonCreateDataDTO,
  ILessonUpdateDataDTO,
  ISubmitLesson,
  PaginatedLessonResponse,
} from './type/index.js';

@Injectable()
export class LessonService {
  constructor(
    private readonly repository: LessonRepository,
    private readonly videoService: VideoService,
    private readonly pdfService: PdfService,
    private readonly coursesRepository: CourseRepository,
  ) {}

  #mediaPath = './media/lessons';

  // ---------------------------------------------------------------------------
  // PRIVATE FUNCTIONS
  // ---------------------------------------------------------------------------
  private async validateDto(dto: any): Promise<IValidation | null> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      return { validation: formatValidationErrors(errors) };
    }
    return null;
  }

  private async findLessonById(id: string): Promise<LessonModel | IError | IValidation> {
    if (!validateUUID(id)) {
      return { validation: 'Invalid lesson ID' };
    }
    const lesson = await this.repository.findOneBy({ id: id });

    if (!lesson) {
      return { error: 'Lesson not found' };
    }
    return lesson;
  }

  // ---------------------------------------------------------------------------
  // CREATE
  // ---------------------------------------------------------------------------

  async create(lesson: ILessonCreateDataDTO): Promise<IMessage | IValidation | IError> {
    const createLessonDto = plainToInstance(CreateLessonDto, lesson);
    const validationErrors = await this.validateDto(createLessonDto);
    if (validationErrors) return validationErrors;

    const { name, description, resource, courseId } = lesson;
    let status: 'in_progress' | 'lock' | 'finish' | null = null;
    let type: 'pdf' | 'video' | null = null;

    if (!validateUUID(courseId)) {
      return { validation: 'Invalid courseId (UUID)' };
    }

    const findCourse = await this.coursesRepository.findOneBy({ id: courseId });

    if (!findCourse) {
      return { validation: `Course with id ${courseId} not found` };
    }

    const findLesson = await this.repository.find();

    if (!findLesson.length) {
      status = 'in_progress';
    }

    let resourceForSave = '';

    if (resource.mimetype === 'video/mp4') {
      resourceForSave =
        appConfig.domain + '/videos/play/' + (await this.videoService.uploadVideo(resource));
      type = 'video';
    } else if (resource.mimetype === 'application/pdf') {
      resourceForSave = appConfig.domain + '/pdf/' + (await this.pdfService.uploadPdf(resource));
      type = 'pdf';
    } else {
      return { validation: 'Unsupported file type. File must be mp4 or pdf' };
    }

    const newLesson = {
      name,
      description,
      resource: resourceForSave,
      courseId,
      status: status ?? 'lock',
      type: type ?? 'video',
    };

    const result = await this.repository.save(newLesson as any);

    return { message: 'Lesson created successfully', payload: result };
  }

  // ---------------------------------------------------------------------------
  // UPDATE
  // ---------------------------------------------------------------------------
  async update(
    id: string,
    updateLesson: ILessonUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const updateLessonDto = plainToInstance(UpdateLessonDto, updateLesson);
    const validationErrors = await this.validateDto(updateLessonDto);
    if (validationErrors) return validationErrors;

    const lessonToUpdate = await this.findLessonById(id);
    if ('error' in lessonToUpdate) return lessonToUpdate;
    if ('validation' in lessonToUpdate) return lessonToUpdate;

    if (updateLesson.courseId && !validateUUID(updateLesson.courseId)) {
      return { validation: 'Invalid courseId (UUID)' };
    }

    if (updateLesson.courseId) {
      const find = await this.coursesRepository.findOneBy({
        id: updateLesson.courseId,
      });

      if (!find) {
        return { error: `Course with ${updateLesson.courseId} not found` };
      }
    }

    Object.assign(lessonToUpdate, updateLesson);

    const result = await this.repository.save(lessonToUpdate);

    return { message: 'Lesson updated successfully', payload: result };
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async get(
    id?: string,
    filters?: GetLessonDto,
  ): Promise<
    LessonModel | LessonModel[] | IError | IValidation | PaginatedLessonResponse<LessonModel>
  > {
    if (id) {
      const lesson = await this.findLessonById(id);
      if ('error' in lesson) return lesson;

      return lesson;
    }

    let lessons: LessonModel[];
    let totalLessons: number;

    if (filters) {
      const { name, status, type, page, limit } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      lessons = await this.repository.findWithFilters({
        name,
        status,
        type,
        skip,
        take: limit,
      });
      totalLessons = await this.repository.countWithFilters({
        name,
        status,
        type,
      });
    } else {
      lessons = await this.repository.find();
      totalLessons = await this.repository.count();
    }

    return {
      total: totalLessons,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: lessons,
    };
  }

  // ---------------------------------------------------------------------------
  // GET LESSONS BY COURSE ID
  // ---------------------------------------------------------------------------
  async getLessonsByCourseId(courseId: string): Promise<IGetLessonByCourseId | IError> {
    if (!validateUUID(courseId)) {
      return { error: 'Invalid course ID' };
    }

    const lessons = await this.repository.findByCourseId(courseId);

    const sortedLessons = lessons.map((lesson) => ({
      id: lesson.id,
      item: lesson.item,
      name: lesson.name,
      status: lesson.status,
      type: lesson.type,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
      deletedAt: lesson.deletedAt,
    }));
    return sortedLessons;
  }

  // ---------------------------------------------------------------------------
  // SUBMIT LESSON
  // ---------------------------------------------------------------------------
  async submitLesson(id: string): Promise<ISubmitLesson | IError | IValidation> {
    const currentLesson = await this.findLessonById(id);
    if ('error' in currentLesson) return currentLesson;
    if ('validation' in currentLesson) return currentLesson;

    const nextLesson = await this.repository.findNextLessonByCourseId(
      currentLesson.courseId,
      currentLesson.item,
    );

    currentLesson.status = 'finish';

    if (nextLesson) {
      nextLesson.status = 'in_progress';
      await this.repository.save(nextLesson);
    }

    await this.repository.save(currentLesson);

    return [
      {
        nextLessonId: nextLesson ? nextLesson.id : null,
        nextLessonItem: nextLesson ? nextLesson.item : null,
      },
    ];
  }

  // ---------------------------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------------------------
  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const lessonToDelete = await this.findLessonById(id);

    if ('error' in lessonToDelete) return lessonToDelete;
    if ('validation' in lessonToDelete) return lessonToDelete;

    try {
      await this.repository.delete(lessonToDelete.id);
      return { message: 'Lesson deleted successfully' };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { error: 'Failed to delete lesson' };
    }
  }
}
