import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import {
  CoursesRepository,
  LessonsRepository,
} from '../_db/repository/_index.js';
import { LessonsModel } from '../_db/model/_index.js';
import {
  ILessonCreateDataDTO,
  ILessonUpdateDataDTO,
  IError,
  IMessage,
  IValidation,
  PaginatedLessonsResponse,
  ISubmitLesson,
  IGetLessonByCourseId,
} from '../types/_index.js';
import { plainToInstance } from 'class-transformer';
import {
  CreateLessonDto,
  GetLessonsDto,
  UpdateLessonDto,
} from '../dto/lessons.dto.js';
import { validateUUID, formatValidationErrors } from '../util/utils.js';
import { VideoStorageIPFSService } from './video-storage-ipfs.service.js';
import { join } from 'path';
import { promises as fs } from 'fs';
import { Config } from '../app/config.app.js';

@Injectable()
export class LessonsService {
  #repository = LessonsRepository;
  #videoService = new VideoStorageIPFSService();
  #mediaPath = './media/lessons';
  #coursesRepository = CoursesRepository;

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

  private async findLessonById(
    id: string,
  ): Promise<LessonsModel | IError | IValidation> {
    if (!validateUUID(id)) {
      return { validation: 'Invalid lesson ID' };
    }
    const lesson = await this.#repository.findOneBy({ id: id });

    if (!lesson) {
      return { error: 'Lesson not found' };
    }
    return lesson;
  }

  private async savePdf(file: Express.Multer.File): Promise<string> {
    const fileId = uuidv4();
    const filePath = join(this.#mediaPath, `${fileId}.pdf`);
    await fs.mkdir(this.#mediaPath, { recursive: true });
    await fs.writeFile(filePath, file.buffer);
    return fileId;
  }

  // ---------------------------------------------------------------------------
  // CREATE
  // ---------------------------------------------------------------------------

  async create(
    lesson: ILessonCreateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const createLessonDto = plainToInstance(CreateLessonDto, lesson);
    const validationErrors = await this.validateDto(createLessonDto);
    if (validationErrors) return validationErrors;

    const { name, description, resource, courseId } = lesson;
    let status: 'in_progress' | 'lock' | 'finish' | null = null;
    let type: 'pdf' | 'video' | null = null;

    if (!validateUUID(courseId)) {
      return { validation: 'Invalid courseId (UUID)' };
    }

    const findCourse = await CoursesRepository.findOneBy({ id: courseId });

    if (!findCourse) {
      return { validation: `Course with id ${courseId} not found` };
    }

    const findLesson = await this.#repository.find();

    if (!findLesson.length) {
      status = 'in_progress';
    }

    let resourceForSave = '';

    if (resource.mimetype === 'video/mp4') {
      resourceForSave = await this.#videoService.uploadVideo(resource);
      type = 'video';
    } else if (resource.mimetype === 'application/pdf') {
      resourceForSave =
        Config.domain + '/pdf/' + (await this.savePdf(resource));
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

    const result = await this.#repository.save(newLesson as any);

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
      const find = await this.#coursesRepository.findOneBy({
        id: updateLesson.courseId,
      });

      if (!find) {
        return { error: `Course with ${updateLesson.courseId} not found` };
      }
    }

    Object.assign(lessonToUpdate, updateLesson);

    const result = await this.#repository.save(lessonToUpdate);

    return { message: 'Lesson updated successfully', payload: result };
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async get(
    id?: string,
    filters?: GetLessonsDto,
  ): Promise<
    | LessonsModel
    | LessonsModel[]
    | IError
    | IValidation
    | PaginatedLessonsResponse<LessonsModel>
  > {
    if (id) {
      const lesson = await this.findLessonById(id);
      if ('error' in lesson) return lesson;

      return lesson;
    }

    let lessons: LessonsModel[];
    let totalLessons: number;

    if (filters) {
      const { name, status, type, page, limit } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      lessons = await this.#repository.findWithFilters({
        name,
        status,
        type,
        skip,
        take: limit,
      });
      totalLessons = await this.#repository.countWithFilters({
        name,
        status,
        type,
      });
    } else {
      lessons = await this.#repository.find();
      totalLessons = await this.#repository.count();
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
  async getLessonsByCourseId(
    courseId: string,
  ): Promise<IGetLessonByCourseId | IError> {
    if (!validateUUID(courseId)) {
      return { error: 'Invalid course ID' };
    }

    const lessons = await this.#repository.findByCourseId(courseId);

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
  async submitLesson(
    id: string,
  ): Promise<ISubmitLesson | IError | IValidation> {
    const currentLesson = await this.findLessonById(id);
    if ('error' in currentLesson) return currentLesson;
    if ('validation' in currentLesson) return currentLesson;

    const nextLesson = await this.#repository.findNextLessonByCourseId(
      currentLesson.courseId,
      currentLesson.item,
    );

    currentLesson.status = 'finish';

    if (nextLesson) {
      nextLesson.status = 'in_progress';
      await this.#repository.save(nextLesson);
    }

    await this.#repository.save(currentLesson);

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

    await this.#repository.delete(id);

    return { message: 'Lesson deleted successfully' };
  }
}
