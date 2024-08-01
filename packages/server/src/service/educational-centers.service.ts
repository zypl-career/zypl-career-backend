import { Injectable } from '@nestjs/common';
import { formatValidationErrors, validateUUID } from '../util/utils.js';
import { validate } from 'class-validator';
import { IError, IMessage, IValidation } from '../types/_index.js';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ImageStorageService } from './image-storage.service.js';
import { Config } from '../app/config.app.js';
import { EducationCenterRepository } from '../_db/repository/educational-centers.repository.js';
import { EducationCenterModel } from '../_db/model/educational-centers.model.js';

@Injectable()
export class EducationCenterService {
  #repository = EducationCenterRepository;
  #mediaPath = 'media/education-center-info';
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

  private async findEducationCenterById(
    id: string,
  ): Promise<EducationCenterModel | IError> {
    if (!validateUUID(id)) {
      return { error: 'Invalid education center ID' };
    }
    const center = await this.#repository.findOneById(id);
    if (!center) {
      return { error: 'Education center not found' };
    }
    return center;
  }

  private async saveGeneralInfoToFile(
    content: string,
    filename: string,
  ): Promise<string> {
    const filePath = join(this.#mediaPath, filename);
    await fs.mkdir(this.#mediaPath, { recursive: true });
    await fs.writeFile(filePath, content);
    return filePath;
  }

  private async readGeneralInfoFromFile(filePath: string): Promise<string> {
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  }

  // ---------------------------------------------------------------------------
  // CREATE
  // ---------------------------------------------------------------------------
  async create(
    title: string,
    image: Express.Multer.File,
    generalInfo: string,
    city: string,
  ): Promise<IMessage | IValidation | IError> {
    if (!title || !image || !generalInfo || !city) {
      return { validation: 'Missing required fields' };
    }

    const uploadedImage = await this.#imageService.uploadImage(image);
    const generalInfoFile = await this.saveGeneralInfoToFile(
      generalInfo,
      `education-center_${uuidv4()}.txt`,
    );

    const newCenter = {
      title,
      image: Config.domain + '/images/get/' + uploadedImage,
      generalInfoFile,
      city,
    };

    await this.#repository.save(newCenter);

    return { message: 'Education center registered successfully' };
  }

  // ---------------------------------------------------------------------------
  // UPDATE
  // ---------------------------------------------------------------------------
  async update(
    id: string,
    title?: string,
    image?: Express.Multer.File,
    generalInfo?: string,
    city?: string,
  ): Promise<IMessage | IValidation | IError> {
    const centerToUpdate = await this.findEducationCenterById(id);

    if ('error' in centerToUpdate) return centerToUpdate;

    if (image) {
      const uploadedImage = await this.#imageService.uploadImage(image);
      centerToUpdate.image = Config.domain + '/images/get/' + uploadedImage;
    }

    if (generalInfo) {
      centerToUpdate.generalInfoFile = await this.saveGeneralInfoToFile(
        generalInfo,
        `education-center_${id}.txt`,
      );
    }

    if (title) centerToUpdate.title = title;
    if (city) centerToUpdate.city = city;

    await this.#repository.save(centerToUpdate);

    return { message: 'Education center updated successfully' };
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async get(
    id?: string,
    city?: string,
  ): Promise<
    EducationCenterModel | EducationCenterModel[] | IError | IValidation
  > {
    if (id) {
      const center = await this.findEducationCenterById(id);
      if ('error' in center) return center;

      const generalInfoContent = await this.readGeneralInfoFromFile(
        center.generalInfoFile,
      );
      return { ...center, generalInfoFile: generalInfoContent };
    }

    if (city) {
      const centers = await this.#repository.findByCity(city);
      const centersWithInfo = await Promise.all(
        centers.map(async (center) => {
          const generalInfoContent = await this.readGeneralInfoFromFile(
            center.generalInfoFile,
          );
          return { ...center, generalInfoFile: generalInfoContent };
        }),
      );
      return centersWithInfo;
    }

    const centers = await this.#repository.find();
    const centersWithInfo = await Promise.all(
      centers.map(async (center) => {
        const generalInfoContent = await this.readGeneralInfoFromFile(
          center.generalInfoFile,
        );
        return { ...center, generalInfoFile: generalInfoContent };
      }),
    );

    return centersWithInfo;
  }

  // ---------------------------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------------------------
  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const centerToDelete = await this.findEducationCenterById(id);
    if ('error' in centerToDelete) return centerToDelete;

    await this.#repository.delete(id);

    return { message: 'Education center deleted successfully' };
  }
}
