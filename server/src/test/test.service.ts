import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { appConfig } from '../app.config.js';
import { IError, IMessage, IValidation } from '../type/base.js';
import { UserRepository } from '../user/_db/repository/index.js';
import { EnumRoles } from '../user/type/index.js';
import { formatValidationErrors, verifyToken } from '../util/index.js';
import { convertData } from '../util/test.js';

import { TestModel } from './_db/model/index.js';
import { TestRepository } from './_db/repository/index.js';
import { createTestModalDto, getTestDTO } from './dto/index.js';

@Injectable()
export class TestService {
  constructor(
    private readonly repository: TestRepository,
    private readonly usersRepository: UserRepository,
  ) {}

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

  private async findTestResultById(
    id: string,
    admin?: boolean,
    userId?: string,
  ): Promise<TestModel | IError> {
    const specialty = admin
      ? await this.repository.findOne({ where: { id } })
      : await this.repository.findOne({ where: { id, userId } });

    if (!specialty) {
      return { error: 'test not found' };
    }
    return specialty;
  }

  // ---------------------------------------------------------------------------
  // CREATE
  // ---------------------------------------------------------------------------
  async create(
    requestData: createTestModalDto,
    token: string,
  ): Promise<IMessage | IValidation | IError> {
    const resultModel = plainToInstance(createTestModalDto, requestData);
    const validationErrors = await this.validateDto(resultModel);
    if (validationErrors) return validationErrors;
    try {
      const data = convertData(requestData);
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(appConfig.modelAPI, options);
      const jsonResponse = await response.json();
      if (response.status !== 200) {
        return {
          error: response.statusText,
        };
      }

      if (token) {
        const verify = verifyToken(token);
        if (!verify) {
          return {
            message: 'Result modal processed successfully',
            info: 'This data not saved because user is not authenticated',
            payload: jsonResponse,
          };
        }
      } else {
        return {
          message: 'Result modal processed successfully',
          info: 'This data not saved because user is not authenticated',
          payload: jsonResponse,
        };
      }

      const verify = verifyToken(token);
      if (!verify)
        return {
          message: 'Result modal processed successfully',
          info: 'This data not saved because user is not authenticated',
          payload: jsonResponse,
        };

      const user = await this.usersRepository.findOneBy({
        id: (verify as any).id,
      });

      if (!user) {
        return {
          error: 'User not found',
        };
      }

      const payload = await this.repository.save({
        userId: user.id,
        resultTest: jsonResponse,
      });

      return {
        message: 'Result modal processed successfully',
        payload,
      };
    } catch (error: any) {
      return { error: JSON.stringify(error) };
    }
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  async get(filters?: getTestDTO, token?: string, id?: string) {
    let articles: TestModel[];

    const userId = filters?.userId;

    if (!token) {
      return {
        unauthorized: 'invalid token',
      };
    }

    const verify = verifyToken(token);

    if (!verify) {
      return {
        unauthorized: 'invalid token',
      };
    }

    const findUserByToken = await this.usersRepository.findOneBy({
      id: (verify as any).id,
    });

    if (id) {
      const testResult = await this.findTestResultById(
        id,
        findUserByToken?.role === 'admin',
        findUserByToken?.id,
      );

      if ('error' in testResult) return testResult;

      return testResult;
    }

    if (userId) {
      const findUserById = await this.usersRepository.findOneBy({
        id: userId,
      });

      if (!findUserById) {
        return { error: 'User with the specified ID not found.' };
      }

      if (!findUserByToken) {
        return { error: 'User associated with the token not found.' };
      }

      if (findUserByToken.role !== EnumRoles.parents) {
        return {
          error: 'Only parents are authorized to access this information.',
        };
      }

      const hasAccess = findUserById.accept?.includes(findUserByToken.id);

      if (!hasAccess) {
        return {
          error: `Access denied. You do not have permission to view the test results for the student with ID ${userId}.`,
        };
      }

      const testResults = await this.repository.find({
        where: { userId: userId },
      });

      return {
        payload: testResults,
      };
    }

    if (findUserByToken?.role === 'admin') {
      if (filters) {
        const resultModel = plainToInstance(getTestDTO, filters);
        const validationErrors = await this.validateDto(resultModel);
        if (validationErrors) return validationErrors;
        const { page, limit } = filters;
        const skip = page && limit ? (page - 1) * limit : undefined;
        articles = await this.repository.findWithFilters({
          skip,
          take: limit,
        });
      } else {
        articles = await this.repository.find();
      }
      return {
        total: articles.length,
        page: filters?.page || 1,
        limit: filters?.limit || 10,
        data: articles,
      };
    }

    if (filters) {
      const resultModel = plainToInstance(getTestDTO, filters);
      const validationErrors = await this.validateDto(resultModel);
      if (validationErrors) return validationErrors;
      const { page, limit } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;
      articles = await this.repository.findWithFilters({
        userId: (verify as any).id,
        skip,
        take: limit,
      });
    } else {
      articles = await this.repository.findWithFilters({
        userId: (verify as any).id,
      });
    }
    return {
      total: articles.length,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: articles,
    };
  }
}