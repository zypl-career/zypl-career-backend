import { Injectable } from '@nestjs/common';

import { UserRepository } from '../_db/repository/user.repository.js';
import {
  IUserLoginResult,
  IUserCreateDataDTO,
  IUserLoginDataDTO,
  IConflict,
  IUserUpdateDataDTO,
  PaginationResult,
} from '../types/_index.js';
import {
  formatValidationErrors,
  generateHash,
  generateToken,
  validateUUID,
} from '../util/utils.js';
import { plainToInstance } from 'class-transformer';
import {
  CreateUserDto,
  LoginUserDto,
  PaginationDto,
  UpdateUserDto,
} from '../dto/user.dto.js';
import { validate } from 'class-validator';
import { UserModel } from '../_db/model/user.model.js';
import { IError, IMessage, IValidation } from '../types/_index.js';

@Injectable()
export class UserService {
  #repository = UserRepository;

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
    const user = await this.#repository.findOneById(id);
    if (!user) {
      return { error: 'User not found' };
    }
    return user;
  }

  private sanitizeUser(user: UserModel): UserModel {
    return { ...user, password: '***secret***' };
  }

  async register(
    user: IUserCreateDataDTO,
  ): Promise<
    { message: string; payload: UserModel } | IValidation | IError | IConflict
  > {
    const createUserDto = plainToInstance(CreateUserDto, user);
    const validationErrors = await this.validateDto(createUserDto);
    if (validationErrors) return validationErrors;

    const newUser = { ...user, password: generateHash(user.password) };
    const existingUser = await this.#repository.findOneBy({
      email: newUser.email,
    });

    if (existingUser) {
      return { conflict: 'User already exists' };
    }

    const savedUser = await this.#repository.save(newUser);

    return {
      message: 'User registered successfully',
      payload: { ...savedUser, password: '****secret****' },
    };
  }

  async login(
    user: IUserLoginDataDTO,
  ): Promise<IUserLoginResult | IMessage | IValidation | IError> {
    const loginUserDto = plainToInstance(LoginUserDto, user);
    const validationErrors = await this.validateDto(loginUserDto);
    if (validationErrors) return validationErrors;

    const existingUser = await this.#repository.findOneBy({
      email: user.email,
      password: generateHash(user.password),
    });

    if (!existingUser) {
      return { error: 'Invalid login credentials' };
    }

    return {
      access: generateToken(existingUser.id, 'access'),
      refresh: generateToken(existingUser.id, 'refresh'),
    };
  }

  async getUser(id: string): Promise<UserModel | IError> {
    const user = await this.findUserById(id);
    if ('error' in user) return user;

    return this.sanitizeUser(user);
  }
  async getUsers(
    id?: string,
    filters?: PaginationDto,
  ): Promise<UserModel | PaginationResult<UserModel> | IError | IValidation> {
    if (id) {
      const user = await this.findUserById(id);
      if ('error' in user) return user;

      return this.sanitizeUser(user);
    } else if (filters) {
      const paginationDto = plainToInstance(PaginationDto, filters);
      const validationErrors = await this.validateDto(paginationDto);
      if (validationErrors) return validationErrors;

      const page = filters.page ?? 1;
      const limit = filters.limit ?? undefined;

      if (isNaN(page)) {
        return { error: 'Page and limit must be numeric values' };
      }

      const queryBuilder = this.#repository.createQueryBuilder('user');

      if (filters.surname) {
        queryBuilder.andWhere('user.surname ILIKE :surname', {
          surname: `%${filters.surname}%`,
        });
      }
      if (filters.patronymic) {
        queryBuilder.andWhere('user.patronymic ILIKE :patronymic', {
          patronymic: `%${filters.patronymic}%`,
        });
      }
      if (filters.gender) {
        queryBuilder.andWhere('user.gender = :gender', {
          gender: filters.gender,
        });
      }
      if (filters.age) {
        queryBuilder.andWhere('user.age = :age', { age: filters.age });
      }
      if (filters.district) {
        queryBuilder.andWhere('user.district ILIKE :district', {
          district: `%${filters.district}%`,
        });
      }
      if (filters.role) {
        queryBuilder.andWhere('user.role = :role', { role: filters.role });
      }
      if (filters.school) {
        queryBuilder.andWhere('user.school ILIKE :school', {
          school: `%${filters.school}%`,
        });
      }
      if (filters.email) {
        queryBuilder.andWhere('user.email ILIKE :email', {
          email: `%${filters.email}%`,
        });
      }
      if (filters.name) {
        queryBuilder.andWhere('user.name ILIKE :name', {
          name: `%${filters.name}%`,
        });
      }

      const [items, totalItems] = await queryBuilder
        .skip(limit && page ? (page - 1) * limit : undefined)
        .take(limit)
        .getManyAndCount();

      return {
        items: items.map((user) => this.sanitizeUser(user)),
        meta: {
          totalItems,
          itemCount: items.length,
          itemsPerPage: limit,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
        },
      };
    } else {
      return { error: 'Either an ID or filters must be provided' };
    }
  }

  async updateUser(
    id: string,
    data: IUserUpdateDataDTO,
  ): Promise<{ message: string; payload: UserModel } | IValidation | IError> {
    const updateUserDto = plainToInstance(UpdateUserDto, data);
    const validationErrors = await this.validateDto(updateUserDto);
    if (validationErrors) return validationErrors;

    const user = await this.findUserById(id);
    if ('error' in user) return user;

    const updatedUser = await this.#repository.save({
      ...user,
      ...data,
    });

    return {
      message: 'User updated successfully',
      payload: this.sanitizeUser(updatedUser),
    };
  }

  async deleteUser(id: string): Promise<IMessage | IError> {
    const user = await this.findUserById(id);
    if ('error' in user) return user;

    await this.#repository.delete(user);

    return { message: 'User deleted successfully' };
  }
}
