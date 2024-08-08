import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { UserRepository } from '../_db/repository/user.repository.js';
import { UserModel } from '../_db/model/user.model.js';
import { CreateUserDto, GetUserDto, UpdateUserDto } from '../dto/user.dto.js';
import { formatValidationErrors, validateUUID } from '../util/utils.js';
import { IError, IMessage, IValidation } from '../types/base.js';
import { PaginatedUserResponse } from '../types/user.js';

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

  async create(
    createUserDto: CreateUserDto,
  ): Promise<IMessage | IValidation | IError> {
    const validationErrors = await this.validateDto(createUserDto);
    if (validationErrors) return validationErrors;

    const {
      name,
      surname,
      patronymic,
      gender,
      age,
      district,
      role,
      school,
      email,
      password,
    } = createUserDto;

    const newUser = {
      name,
      surname,
      patronymic,
      gender,
      age,
      district,
      role,
      school,
      email,
      password,
    };

    await this.#repository.save(newUser);

    return { message: 'User created successfully' };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IMessage | IValidation | IError> {
    const validationErrors = await this.validateDto(updateUserDto);
    if (validationErrors) return validationErrors;

    const userToUpdate = await this.findUserById(id);
    if ('error' in userToUpdate) return userToUpdate;

    const updatedUser = { ...userToUpdate, ...updateUserDto };

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
