import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';

import { appConfig } from '../app.config.js';
import { ImageService } from '../image/image.service.js';
import { IError, IMessage, IValidation } from '../type/base.js';
import { formatValidationErrors, validateUUID } from '../util/index.js';

import { PartnerModel } from './_db/model/index.js';
import { PartnerRepository } from './_db/repository/index.js';

import ExcelJS from 'exceljs';

@Injectable()
export class PartnerService {
  constructor(
    private readonly repository: PartnerRepository,
    private readonly imageService: ImageService,
  ) {}

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
    const partner = await this.repository.findOneById(id);
    if (!partner) {
      return { error: 'Partner not found' };
    }
    return partner;
  }

  async create(partner: Express.Multer.File): Promise<IMessage | IValidation | IError> {
    if (!partner) return { validation: 'Invalid partner' };

    const uploadedImage = await this.imageService.uploadImage(partner);
    const newPartner = {
      ...partner,
      image: appConfig.domain + '/image/get/' + uploadedImage,
    };

    await this.repository.save(newPartner);

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
      const newImage = await this.imageService.uploadImage(file);
      partnerToUpdate = {
        ...partnerToUpdate,
        image: appConfig.domain + '/image/get/' + newImage,
      };
    }

    await this.repository.save(partnerToUpdate);

    return { message: 'User successfully updated' };
  }

  async getPartner(id?: string): Promise<PartnerModel | PartnerModel[] | IError | IValidation> {
    if (id) {
      const partner = await this.findPartnerById(id);
      if ('error' in partner) return partner;
      return partner;
    }

    return await this.repository.find();
  }

  async getPaginatedPartners(
    page: number,
    limit: number,
  ): Promise<{ total: number; page: number; limit: number; data: PartnerModel[] } | IError> {
    const [partners, total] = await Promise.all([
      this.repository.findWithFilters({ page, limit }),
      this.repository.countWithFilters(),
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

    await this.repository.delete(id);

    return { message: 'Partner deleted successfully' };
  }

  // ---------------------------------------------------------------------------
  // EXPORT
  // ---------------------------------------------------------------------------
  async exportToExcel(): Promise<ExcelJS.Buffer> {
    const db = await this.repository.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Partner');

    const headers = Object.keys(db[0] || {}).map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      key: key,
      width: 30,
    }));

    worksheet.columns = headers;

    db.forEach((article) => {
      worksheet.addRow(article);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
