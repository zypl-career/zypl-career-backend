import { Injectable } from '@nestjs/common';

import { UserRepository } from '../_db/repository/user.repository.js';
import {
  IError,
  IMessage,
  IUserLoginResult,
  IUserCreateDataDTO,
  IValidation,
  IUserLoginDataDTO,
} from '../types/_index.js';
import {
  formatValidationErrors,
  generateHash,
  generateRefreshToken,
  generateToken,
  validateUUID,
} from '../util/utils.js';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto/user.dto.js';
import { validate } from 'class-validator';
import { UserModel } from '../_db/model/user.model.js';

@Injectable()
export class UserService {
  #repository = UserRepository;

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

  // ---------------------------------------------------------------------------
  // REGISTER
  // ---------------------------------------------------------------------------
  async register(
    user: IUserCreateDataDTO,
  ): Promise<IMessage | IValidation | IError> {
    const createUserDto = plainToInstance(CreateUserDto, user);
    const validationErrors = await this.validateDto(createUserDto);
    if (validationErrors) return validationErrors;

    const newUser = { ...user, password: generateHash(user.password) };
    const existingUser = await this.#repository.findOneBy({
      email: newUser.email,
    });

    if (existingUser) {
      return { error: 'User already exists' };
    }

    await this.#repository.save(newUser);

    return { message: 'User registered successfully' };
  }

  // ---------------------------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------------------------
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
      access: generateToken(existingUser.id, user.email),
      refresh: generateRefreshToken(existingUser.id, user.email),
    };
  }

  // ---------------------------------------------------------------------------
  // USER UPDATE
  // ---------------------------------------------------------------------------
  async updateUser(
    id: string,
    user: UpdateUserDto,
  ): Promise<IMessage | IValidation | IError> {
    const validationErrors = await this.validateDto(user);
    if (validationErrors) return validationErrors;

    const userToUpdate = await this.findUserById(id);

    if ('error' in userToUpdate) return userToUpdate;

    Object.assign(userToUpdate, {
      ...user,
      password: user.password
        ? generateHash(user.password)
        : userToUpdate.password,
    });

    await this.#repository.save(userToUpdate);

    return { message: 'User updated successfully' };
  }

  // ---------------------------------------------------------------------------
  // USER GET
  // ---------------------------------------------------------------------------
  async getUser(
    id?: string,
  ): Promise<UserModel | UserModel[] | IError | IValidation> {
    if (id) {
      const user = await this.findUserById(id);
      if ('error' in user) return user;
      return this.sanitizeUser(user);
    }

    const users = (await this.#repository.find()).map(this.sanitizeUser);
    return users;
  }

  // ---------------------------------------------------------------------------
  // USER DELETE
  // ---------------------------------------------------------------------------
  async deleteUser(id: string): Promise<IMessage | IError | IValidation> {
    const userToDelete = await this.findUserById(id);
    if ('error' in userToDelete) return userToDelete;

    await this.#repository.delete(id);

    return { message: 'User deleted successfully' };
  }
}
