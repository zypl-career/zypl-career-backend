import { Injectable } from '@nestjs/common';
import { PartnerRepository } from '../_db/repository/partner.repository.js';
import { validate } from 'class-validator';
import { PartnerModel } from '../_db/model/partner.model.js';
import { IError, IMessage, IValidation } from '../types/_index.js';
import { formatValidationErrors, validateUUID } from '../util/utils.js';
import { ImageStorageService } from './image-storage.service.js';
import { Config } from '../app/config.app.js';

@Injectable()
export class PartnerService {
  #repository = PartnerRepository;
  #imageService = new ImageStorageService();

  private async validateDto(dto: any): Promise<IValidation | null> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      return { validation: formatValidationErrors(errors) };
    }
    return null;
  }

  private async findPartnerById(id: string): Promise<PartnerModel | IError> {
    if (!validateUUID(id)) {
      return { error: 'Invalid partner ID' };
    }
    const partner = await this.#repository.findOneById(id);
    if (!partner) {
      return { error: 'Partner not found' };
    }
    return partner;
  }

  async create(
    partner: Express.Multer.File,
  ): Promise<IMessage | IValidation | IError> {
    if (!partner) return { validation: 'Invalid partner' };

    const uploadedImage = await this.#imageService.uploadImage(partner);
    const newPartner = {
      ...partner,
      image: Config.domain + '/images/get/' + uploadedImage,
    };

    await this.#repository.save(newPartner);

    return { message: 'Partner registered successfully' };
  }

  async updatePartner(
    id: string,
    file: Express.Multer.File,
  ): Promise<IMessage | IValidation | IError> {
    if (!file) return { validation: 'Invalid partner' };

    let partnerToUpdate = await this.findPartnerById(id);

    if ('error' in partnerToUpdate) return partnerToUpdate;

    if (file) {
      const newImage = await this.#imageService.uploadImage(file);
      partnerToUpdate = {
        ...partnerToUpdate,
        image: Config.domain + '/images/get/' + newImage,
      };
    }

    await this.#repository.save(partnerToUpdate);

    return { message: 'User successfully updated' };
  }

  async getPartner(
    id?: string,
  ): Promise<PartnerModel | PartnerModel[] | IError | IValidation> {
    if (id) {
      const partner = await this.findPartnerById(id);
      if ('error' in partner) return partner;
      return partner;
    }

    return await this.#repository.find();
  }

  async getPaginatedPartners(
    page: number,
    limit: number,
  ): Promise<
    | { total: number; page: number; limit: number; data: PartnerModel[] }
    | IError
  > {
    const [partners, total] = await Promise.all([
      this.#repository.findWithFilters({ page, limit }),
      this.#repository.countWithFilters(),
    ]);

    return {
      total,
      page,
      limit,
      data: partners,
    };
  }

  async deletePartner(id: string): Promise<IMessage | IError | IValidation> {
    const partnerToDelete = await this.findPartnerById(id);
    if ('error' in partnerToDelete) return partnerToDelete;

    await this.#repository.delete(id);

    return { message: 'Partner deleted successfully' };
  }
}
