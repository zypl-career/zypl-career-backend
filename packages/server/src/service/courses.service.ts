import { Injectable } from '@nestjs/common';
import { isArray, validate } from 'class-validator';
import { ImageStorageService } from './image-storage.service.js';
import { Config } from '../app/config.app.js';
import { CoursesRepository } from '../_db/repository/_index.js';
import { CoursesModel } from '../_db/model/_index.js';
import {
  ICourseCreateDataDTO,
  ICourseUpdateDataDTO,
  IError,
  IMessage,
  IValidation,
  PaginatedCoursesResponse,
} from '../types/_index.js';
import { formatValidationErrors, validateUUID } from '../util/utils.js';
import {
  CreateCourseDto,
  GetCoursesDto,
  UpdateCourseDto,
} from '../dto/courses.dto.js';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CoursesService {
  #repository = CoursesRepository;
  #imageService = new ImageStorageService();

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

  private async findCourseById(id: string): Promise<CoursesModel | IError> {
    if (!validateUUID(id)) {
      return { error: 'Invalid course ID' };
    }
    const course = await this.#repository.findOneById(id);
    if (!course) {
      return { error: 'Course not found' };
    }
    return course;
  }

  // ---------------------------------------------------------------------------
  // CREATE
  // ---------------------------------------------------------------------------
  async create(
    course: ICourseCreateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const arrayTags = isArray(course.tags)
      ? course.tags
      : (course.tags as string).split(', ');

    const createCourseDto = plainToInstance(CreateCourseDto, course);
    const validationErrors = await this.validateDto(createCourseDto);
    if (validationErrors) return validationErrors;

    const { title, description, image, finishedPercentage } = course;

    const uploadedImage = await this.#imageService.uploadImage(image);

    const newCourse = {
      title,
      description,
      image: Config.domain + '/images/get/' + uploadedImage,
      finishedPercentage,
      tags: arrayTags,
    };

    const result = await this.#repository.save(newCourse);

    return { message: 'Course created successfully', payload: result };
  }

  // ---------------------------------------------------------------------------
  // UPDATE
  // ---------------------------------------------------------------------------

  async update(
    id: string,
    updateCourse: ICourseUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const arrayTags = updateCourse.tags
      ? isArray(updateCourse.tags)
        ? updateCourse.tags
        : (updateCourse.tags as string).split(',')
      : null;

    updateCourse = {
      ...updateCourse,
      tags: arrayTags ?? updateCourse.tags ?? undefined,
    };
    const updateCourseDto = plainToInstance(UpdateCourseDto, updateCourse);
    const validationErrors = await this.validateDto(updateCourseDto);
    if (validationErrors) return validationErrors;

    const courseToUpdate = await this.findCourseById(id);

    if ('error' in courseToUpdate) return courseToUpdate;

    const { title, description, image, finishedPercentage, tags } =
      updateCourse;

    if (image) {
      const uploadedImage = await this.#imageService.uploadImage(image);
      courseToUpdate.image = Config.domain + '/images/get/' + uploadedImage;
    }

    if (description) {
      courseToUpdate.description = description;
    }

    if (title) courseToUpdate.title = title;
    if (finishedPercentage !== undefined)
      courseToUpdate.finishedPercentage = finishedPercentage;
    if (tags)
      courseToUpdate.tags = isArray(tags) ? tags : (tags as string).split(',');

    const result = await this.#repository.save(courseToUpdate);

    return { message: 'Course updated successfully', payload: result };
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async get(
    id?: string,
    filters?: GetCoursesDto,
  ): Promise<
    | CoursesModel
    | CoursesModel[]
    | IError
    | IValidation
    | PaginatedCoursesResponse<CoursesModel>
  > {
    if (id) {
      const course = await this.findCourseById(id);
      if ('error' in course) return course;

      return course;
    }

    let courses: CoursesModel[];
    let totalCourses: number;

    if (filters) {
      const { title, description, finishedPercentage, tags, page, limit } =
        filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      courses = await this.#repository.findWithFilters({
        title,
        description,
        finishedPercentage,
        tags,
        skip,
        take: limit,
      });
      totalCourses = await this.#repository.countWithFilters({
        title,
        description,
        finishedPercentage,
        tags,
      });
    } else {
      courses = await this.#repository.find();
      totalCourses = await this.#repository.count();
    }

    return {
      total: totalCourses,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: courses,
    };
  }

  // ---------------------------------------------------------------------------
  // GET DISTINCT TAGS
  // ---------------------------------------------------------------------------
  async getAllTags(): Promise<string[] | IError> {
    try {
      const tags = await this.#repository.getDistinctTags();
      return tags;
    } catch (error) {
      return { error: 'Failed to retrieve tags' };
    }
  }

  // ---------------------------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------------------------
  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const courseToDelete = await this.findCourseById(id);
    if ('error' in courseToDelete) return courseToDelete;

    await this.#repository.delete(id);

    return { message: 'Course deleted successfully' };
  }
}
