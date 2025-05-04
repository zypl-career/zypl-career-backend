import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { EmailVerifyRepository } from '../email/_db/repository/index.js';
import { EmailService } from '../email/email.service.js';
import { IConflict, IError, IMessage, IValidation } from '../type/index.js';
import { formatValidationErrors, generateToken, validateUUID } from '../util/index.js';

import { UserFastModel } from './_db/model/index.js';
import { UserFastRepository } from './_db/repository/index.js';
import { CreateUserFastDto, GetUserFastDto, UpdateUserFastDto } from './dto/index.js';
import { IUserCreateDataDTO, IUserUpdateDataDTO, PaginatedUserResponse } from './type/index.js';

import ExcelJS from 'exceljs';

@Injectable()
export class UserFastService {
  constructor(
    private readonly repository: UserFastRepository,
    private readonly repositoryEmail: EmailVerifyRepository,
    private readonly emailService: EmailService,
  ) {}

  private async validateDto(dto: any): Promise<IValidation | null> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      return { validation: formatValidationErrors(errors) };
    }
    return null;
  }

  private async findUserById(id: string): Promise<UserFastModel | IError> {
    if (!validateUUID(id)) {
      return { error: 'Invalid user ID' };
    }
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      return { error: 'User not found' };
    }
    return user;
  }

  async create(user: IUserCreateDataDTO): Promise<IMessage | IValidation | IError | IConflict> {
    const createUserDto = plainToInstance(CreateUserFastDto, user);
    const validationErrors = await this.validateDto(createUserDto);
    if (validationErrors) return validationErrors;

    const savedData = await this.repository.save(createUserDto);

    const result = {
      ...createUserDto,
      accessToken: generateToken(savedData.id),
    };
    return {
      message: 'User registered successfully',
      payload: result,
    };
  }

  async update(
    id: string,
    updateUser: IUserUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError | IConflict> {
    const updateUserDto = plainToInstance(UpdateUserFastDto, updateUser);
    const validationErrors = await this.validateDto(updateUserDto);
    if (validationErrors) return validationErrors;

    const userToUpdate = await this.findUserById(id);
    if ('error' in userToUpdate) return userToUpdate;

    const updatedUser = { ...userToUpdate, ...updateUser };

    await this.repository.save(updatedUser as any);

    return { message: 'User updated successfully' };
  }

  async get(
    id?: string,
    filters?: GetUserFastDto,
  ): Promise<UserFastModel | UserFastModel[] | IError | IValidation | PaginatedUserResponse> {
    if (id) {
      const user = await this.findUserById(id);
      if ('error' in user) return user;
      return user;
    }

    let users: UserFastModel[];
    let totalUsers: number;

    if (filters) {
      const getUserDto = plainToInstance(GetUserFastDto, filters);
      const validationErrors = await this.validateDto(getUserDto);
      if (validationErrors) return validationErrors;
      const { gender, age, district, page, limit } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      users = await this.repository.findWithFilters({
        gender,
        age,
        district,
        skip,
        take: limit,
      });
      totalUsers = await this.repository.countWithFilters({
        gender,
        age,
        district,
      });
    } else {
      users = await this.repository.find();
      totalUsers = await this.repository.count();
    }

    return {
      total: totalUsers,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: users as any,
    };
  }

  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const userToDelete = await this.findUserById(id);
    if ('error' in userToDelete) return userToDelete;

    await this.repository.delete(id);

    return { message: 'User deleted successfully' };
  }
  // ---------------------------------------------------------------------------
  // EXPORT
  // ---------------------------------------------------------------------------
  async exportToExcel(): Promise<ExcelJS.Buffer> {
    const db = await this.repository.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

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
