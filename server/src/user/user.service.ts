import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { isEmail, validate } from 'class-validator';

import { EmailVerifyRepository } from '../email/_db/repository/index.js';
import { EmailService } from '../email/email.service.js';
import { IConflict, IError, IMessage, IValidation } from '../type/index.js';
import {
  formatValidationErrors,
  generateHash,
  generateRefreshToken,
  generateToken,
  validateUUID,
  verifyToken,
} from '../util/index.js';

import { UserModel } from './_db/model/index.js';
import { UserRepository } from './_db/repository/index.js';
import {
  ChangePasswordDto,
  CreateUserDto,
  GetUserDto,
  LoginUserDto,
  UpdateUserDto,
  VerifyEmailDto,
} from './dto/index.js';
import {
  EnumRoles,
  IUserCreateDataDTO,
  IUserLoginDataDTO,
  IUserLoginResult,
  IUserUpdateDataDTO,
  PaginatedUserResponse,
} from './type/index.js';

import ExcelJS from 'exceljs';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
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

  private async findUserById(id: string): Promise<UserModel | IError> {
    if (!validateUUID(id)) {
      return { error: 'Invalid user ID' };
    }
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      return { error: 'User not found' };
    }
    return user;
  }

  private async findUserByEmail(email: string): Promise<UserModel | IError> {
    if (!isEmail(email)) {
      return { error: 'Invalid Email' };
    }
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      return { error: 'User not found' };
    }

    return user;
  }

  async login(
    user: IUserLoginDataDTO,
  ): Promise<IUserLoginResult | IMessage | IValidation | IError | { unauthorized: string }> {
    const loginUserDto = plainToInstance(LoginUserDto, user);
    const validationErrors = await this.validateDto(loginUserDto);
    if (validationErrors) return validationErrors;

    const existingUser = await this.repository.findOneBy({
      email: user.email,
      password: generateHash(user.password),
    });

    if (!existingUser) {
      return { unauthorized: 'Invalid login credentials' };
    }

    return {
      access: generateToken(existingUser.id, user.email),
      refresh: generateRefreshToken(existingUser.id, user.email),
      user: { ...existingUser, password: undefined },
    };
  }

  async create(user: IUserCreateDataDTO): Promise<IMessage | IValidation | IError | IConflict> {
    const createUserDto = plainToInstance(CreateUserDto, user);
    const validationErrors = await this.validateDto(createUserDto);
    if (validationErrors) return validationErrors;

    if (user.role === EnumRoles.admin) {
      return { validation: 'Admins can not create new users' };
    }

    const newUser = { ...user, password: generateHash(user.password) };

    const existingUser = await this.repository.findOneBy({
      email: newUser.email,
    });

    if (existingUser) {
      return { conflict: 'User already exists' };
    }

    await this.repository.save(newUser as any);

    return {
      message: 'User registered successfully',
      payload: { ...newUser, password: '****secret****' },
    };
  }

  async update(
    id: string,
    updateUser: IUserUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError | IConflict> {
    const updateUserDto = plainToInstance(UpdateUserDto, updateUser);
    const validationErrors = await this.validateDto(updateUserDto);
    if (validationErrors) return validationErrors;

    const userToUpdate = await this.findUserById(id);
    if ('error' in userToUpdate) return userToUpdate;

    if (updateUser.email) {
      const existingUser = await this.repository.findOneBy({
        email: updateUser.email,
      });

      if (existingUser) {
        return { conflict: 'Email already exists' };
      }
    }

    if (updateUser.password) {
      updateUser.password = generateHash(updateUser.password);
    } else {
      delete updateUser.password;
    }

    const updatedUser = { ...userToUpdate, ...updateUser };

    await this.repository.save(updatedUser as any);

    return { message: 'User updated successfully' };
  }

  async get(
    id?: string,
    filters?: GetUserDto,
  ): Promise<UserModel | UserModel[] | IError | IValidation | PaginatedUserResponse> {
    if (id) {
      const user = await this.findUserById(id);
      if ('error' in user) return user;
      return user;
    }

    let users: UserModel[];
    let totalUsers: number;

    if (filters) {
      const getUserDto = plainToInstance(GetUserDto, filters);
      const validationErrors = await this.validateDto(getUserDto);
      if (validationErrors) return validationErrors;
      const { name, surname, gender, age, district, role, email, page, limit } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      users = await this.repository.findWithFilters({
        name,
        surname,
        gender,
        age,
        district,
        role,
        email,
        skip,
        take: limit,
      });
      totalUsers = await this.repository.countWithFilters({
        name,
        surname,
        gender,
        age,
        district,
        role,
        email,
      });
    } else {
      users = await this.repository.find();
      totalUsers = await this.repository.count();
    }
    const sanitizedUsers = users.map(({ password: _, ...rest }) => rest);

    return {
      total: totalUsers,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: sanitizedUsers as any,
    };
  }

  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const userToDelete = await this.findUserById(id);
    if ('error' in userToDelete) return userToDelete;

    await this.repository.delete(id);

    return { message: 'User deleted successfully' };
  }

  async verifyEmail(email: string, code: number): Promise<IMessage | IError | IValidation> {
    const verifyUserDto = plainToInstance(VerifyEmailDto, {
      email,
      code,
    });

    const validationErrors = await this.validateDto(verifyUserDto);
    if (validationErrors) return validationErrors;

    const userToVerify = await this.findUserByEmail(email);

    if ('error' in userToVerify) {
      return userToVerify;
    }

    const findEmailVerify = await this.repositoryEmail.findOneBy({
      email,
      code,
    });

    if (!findEmailVerify) {
      return {
        validation: 'Email or code is incorrect',
      };
    }

    this.repository.save({ ...userToVerify, emailConfirmed: true });

    return { message: 'Email successfully verified' };
  }

  async changePassword(
    email: string,
    code: number,
    newPassword: string,
  ): Promise<IMessage | IError | IValidation> {
    const verifyUserDto = plainToInstance(ChangePasswordDto, {
      email,
      code,
      newPassword,
    });

    const validationErrors = await this.validateDto(verifyUserDto);
    if (validationErrors) return validationErrors;

    const userToVerify = await this.findUserByEmail(email);

    if ('error' in userToVerify) {
      return userToVerify;
    }

    const findEmailVerify = await this.repositoryEmail.findOneBy({
      email,
      code,
    });

    if (!findEmailVerify) {
      return {
        validation: 'Email or code is incorrect',
      };
    }

    this.repository.save({
      ...userToVerify,
      emailConfirmed: true,
      password: generateHash(newPassword),
    });

    return { message: 'Password successfully changed' };
  }

  async sendCodeToEmail(email: string) {
    const userToVerify = await this.findUserByEmail(email);

    if ('error' in userToVerify) {
      return userToVerify;
    }

    await this.emailService.sendMessage(email);

    return {
      message: 'code successfully sended',
    };
  }

  async getAccessParent(parentId: string, token: string) {
    if (!token) {
      return {
        error: 'Token is missing or invalid.',
      };
    }

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return {
        error: 'Token verification failed.',
      };
    }

    const userId = (decodedToken as any).id;

    const user = await this.repository.findOneBy({ id: userId });

    if (!user) {
      return {
        error: 'User not found.',
      };
    }

    if (user.role !== 'student') {
      return { error: 'Only students can set accept' };
    }

    const updatedAcceptList = user.accept ? [...user.accept, parentId] : [parentId];

    await this.repository.save({
      ...user,
      accept: updatedAcceptList,
    });

    return {
      message: 'Parent access successfully added.',
    };
  }

  // ---------------------------------------------------------------------------
  // EXPORT
  // ---------------------------------------------------------------------------
  async exportToExcel(): Promise<ExcelJS.Buffer> {
    const db = await this.repository.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('University');

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
