import { Injectable } from '@nestjs/common';
import { createTestModalDto as ResultModelDto } from '../dto/test.dto.js';
import { IError, IMessage, IValidation } from '../types/base.js';
import { convertData } from '../util/test.js';
import { Config } from '../app/config.app.js';
import { formatValidationErrors, verifyToken } from '../util/utils.js';
import { TestRepository } from '../_db/repository/test.repository.js';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from '../_db/repository/user.repository.js';

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

  async create(
    requestData: ResultModelDto,
    token: string,
  ): Promise<IMessage | IValidation | IError> {
    const resultModel = plainToInstance(ResultModelDto, requestData);
    const validationErrors = await this.validateDto(resultModel);
    if (validationErrors) return validationErrors;
    try {
      const verify = verifyToken(token);
      if (!verify) {
        return {
          error: 'Invalid token',
        };
      }

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

  async get() {
    const res = await this.#repository.find();
    return res;
  }
}
