import { Injectable } from '@nestjs/common';
import {
  getTestDTO,
  createTestModalDto as ResultModelDto,
} from '../dto/test.dto.js';
import { IError, IMessage, IValidation } from '../types/base.js';
import { convertData } from '../util/test.js';
import { Config } from '../app/config.app.js';
import { formatValidationErrors, verifyToken } from '../util/utils.js';
import { TestRepository } from '../_db/repository/test.repository.js';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from '../_db/repository/user.repository.js';
import { TestModel } from '../_db/model/test.model.js';

@Injectable()
export class ResultModelService {
  #repository = TestRepository;
  #usersRepository = UserRepository;

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

  // ---------------------------------------------------------------------------
  // CREATE
  // ---------------------------------------------------------------------------
  async create(
    requestData: ResultModelDto,
    token: string,
  ): Promise<IMessage | IValidation | IError> {
    const resultModel = plainToInstance(ResultModelDto, requestData);
    const validationErrors = await this.validateDto(resultModel);
    if (validationErrors) return validationErrors;
    try {
      const data = convertData(requestData);
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(Config.modelAPI, options);
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

      const user = await this.#usersRepository.findOne({
        where: { id: (token as any).id },
      });

      if (!user) {
        return {
          error: 'User not found',
        };
      }

      const test = await this.#repository.save({
        user: user,
        resultTest: jsonResponse,
      });

      const payload = {
        id: test.id,
        userId: user.id,
        resultTest: jsonResponse,
        createdAt: test.createdAt,
        updatedAt: test.updatedAt,
        deletedAt: test.deletedAt,
      };

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
  async get(filters?: getTestDTO, token?: string) {
    let articles: TestModel[];

    if (!token) return;

    const verify = verifyToken(token);

    if (!verify) return;

    if ((verify as any).email === 'admin@gmail.com') {
    }

    if (filters) {
      const { page, limit } = filters;
      const skip = page && limit ? (page - 1) * limit : undefined;
      articles = await this.#repository.findWithFilters({
        skip,
        take: limit,
      });
    } else {
      articles = await this.#repository.find();
    }
    return {
      total: articles.length,
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      data: articles,
    };
  }
}
