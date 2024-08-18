import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { UserRepository } from '../_db/repository/user.repository.js';
import { UserModel } from '../_db/model/user.model.js';
import {
  CreateUserDto,
  GetUserDto,
  LoginUserDto,
  UpdateUserDto,
} from '../dto/user.dto.js';
import {
  formatValidationErrors,
  generateHash,
  generateRefreshToken,
  generateToken,
  validateUUID,
} from '../util/utils.js';
import { IConflict, IError, IMessage, IValidation } from '../types/base.js';
import {
  IUserCreateDataDTO,
  IUserLoginDataDTO,
  IUserLoginResult,
  IUserUpdateDataDTO,
  PaginatedUserResponse,
} from '../types/user.js';
import { plainToInstance } from 'class-transformer';

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

  async login(
    user: IUserLoginDataDTO,
  ): Promise<
    | IUserLoginResult
    | IMessage
    | IValidation
    | IError
    | { unauthorized: string }
  > {
    const loginUserDto = plainToInstance(LoginUserDto, user);
    const validationErrors = await this.validateDto(loginUserDto);
    if (validationErrors) return validationErrors;

    const existingUser = await this.#repository.findOneBy({
      email: user.email,
      password: generateHash(user.password),
    });

    if (!existingUser) {
      return { unauthorized: 'Invalid login credentials' };
    }

    return {
      access: generateToken(existingUser.id, user.email),
      refresh: generateRefreshToken(existingUser.id, user.email),
    };
  }
  async create(
    user: IUserCreateDataDTO,
  ): Promise<IMessage | IValidation | IError | IConflict> {
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

    await this.#repository.save(newUser);

    return {
      message: 'User registered successfully',
      payload: { ...newUser, password: '****secret****' },
    };
  }
  async update(
    id: string,
    updateUser: IUserUpdateDataDTO,
  ): Promise<IMessage | IValidation | IError | IConflict> {
    const createUserDto = plainToInstance(UpdateUserDto, updateUser);
    const validationErrors = await this.validateDto(createUserDto);
    if (validationErrors) return validationErrors;

    const userToUpdate = await this.findUserById(id);
    if ('error' in userToUpdate) return userToUpdate;

    if (updateUser.email) {
      const existingUser = await this.#repository.findOneBy({
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

    await this.#repository.save(updatedUser);

    return { message: 'User updated successfully' };
  }

  async get(
    id?: string,
    filters?: GetUserDto,
  ): Promise<
    UserModel | UserModel[] | IError | IValidation | PaginatedUserResponse
  > {
    if (id) {
      const user = await this.findUserById(id);
      if ('error' in user) return user;
      return user;
    }

    let users: UserModel[];
    let totalUsers: number;

    if (filters) {
      const createUserDto = plainToInstance(GetUserDto, filters);
      const validationErrors = await this.validateDto(createUserDto);
      if (validationErrors) return validationErrors;
      const { name, surname, gender, age, district, role, email, page, limit } =
        filters;
      const skip = page && limit ? (page - 1) * limit : undefined;

      users = await this.#repository.findWithFilters({
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
      totalUsers = await this.#repository.countWithFilters({
        name,
        surname,
        gender,
        age,
        district,
        role,
        email,
      });
    } else {
      users = await this.#repository.find();
      totalUsers = await this.#repository.count();
    }

    return {
      total: totalUsers,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: users,
    };
  }

  async delete(id: string): Promise<IMessage | IError | IValidation> {
    const userToDelete = await this.findUserById(id);
    if ('error' in userToDelete) return userToDelete;

    await this.#repository.delete(id);

    return { message: 'User deleted successfully' };
  }
}
