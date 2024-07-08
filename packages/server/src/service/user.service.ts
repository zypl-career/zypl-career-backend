import { Injectable } from '@nestjs/common';

import { UserRepository } from '../_db/repository/user.repository.js';
import {
  IError,
  IMessage,
  IUserLoginData,
  IUserLoginResult,
  IUserRegisterData,
  IValidation,
} from '../types/_index.js';
import {
  generateHash,
  generateRefreshToken,
  generateToken,
} from '../util/utils.js';

@Injectable()
export class UserService {
  #repository = UserRepository;

  // ---------------------------------------------------------------------------
  // VALIDATION
  // ---------------------------------------------------------------------------

  /**
   * Registers a new user.
   *
   * @param user - An object containing the user's registration data.
   * @property {string} login - The user's login.
   * @property {string} name - The user's name.
   * @property {string} password - The user's password.
   *
   * @returns {Object} - An object containing a message indicating the success of the registration.
   * @property {string} message - A success message.
   *
   * @throws {Object} - An object containing a message indicating a missing required field.
   * @property {string} message - A message indicating the missing field.
   */

  // ---------------------------------------------------------------------------
  // REGISTER
  // ---------------------------------------------------------------------------
  async register(
    user: IUserRegisterData,
  ): Promise<IMessage | IValidation | IError> {
    const requiredFields: (keyof IUserRegisterData)[] = [
      'login',
      'name',
      'password',
    ];

    for (const field of requiredFields) {
      if (!user[field]) {
        return {
          validation: `${field} is required`,
        };
      }
    }

    const newUser = { ...user, password: generateHash(user.password) };

    const find = await this.#repository.findOneBy({
      login: newUser.login,
    });

    if (find) {
      return { error: 'User already exists' };
    }

    await this.#repository.save(newUser);

    return {
      message: 'User registered successfully',
    };
  }

  /**
   * Logs in a user.
   *
   * @param user - An object containing the user's login data.
   * @property {string} login - The user's login.
   * @property {string} password - The user's password.
   *
   * @returns {Promise<IUserLoginResult | { message: string }>} - A promise that resolves to either an object containing the access and refresh tokens, or an object containing an error message.
   * @property {string} [access] - The access token generated for the user.
   * @property {string} [refresh] - The refresh token generated for the user.
   * @property {string} [message] - An error message indicating a missing field or an unsuccessful login attempt.
   */

  // ---------------------------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------------------------
  async login(
    user: IUserLoginData,
  ): Promise<IUserLoginResult | IMessage | IValidation | IError> {
    const requiredFields: (keyof IUserLoginData)[] = ['login', 'password'];

    for (const field of requiredFields) {
      if (!user[field]) {
        return {
          validation: `${field} is required`,
        };
      }
    }

    const find = await this.#repository.findOneBy({
      login: user.login,
      password: generateHash(user.password),
    });

    if (find) {
      return {
        access: generateToken(find.id, user.login),
        refresh: generateRefreshToken(find.id, user.login),
      };
    }

    return { error: 'Invalid login credentials' };
  }
}
