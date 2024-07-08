import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { UserService } from '../service/_index.js';
import {
  IMessage,
  IUserLoginData,
  IUserLoginResult,
  IUserRegisterData,
} from '../types/_index.js';

@Controller('/auth')
export class UserController {
  constructor(private readonly service: UserService) {}

  // ---------------------------------------------------------------------------
  // REGISTER
  // ---------------------------------------------------------------------------

  /**
   * Registers a new user.
   *
   * @param {IUserRegisterData} user - The data required to register a new user.
   * @returns {Promise<{ message: string }>} - A promise that resolves to a message upon successful registration.
   */
  @Post('/register')
  @HttpCode(201)
  async register(@Body() user: IUserRegisterData): Promise<IMessage> {
    const result = await this.service.register(user);
    if ('error' in result) {
      throw new HttpException(result.error, HttpStatus.FOUND);
    } else if ('validation' in result) {
      throw new HttpException(result.validation, HttpStatus.BAD_REQUEST);
    } else {
      return result;
    }
  }

  // ---------------------------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------------------------

  /**
   * Handles the login request for a user.
   *
   * @param {IUserLoginData} user - The data required to login a user.
   * @returns {Promise<IUserLoginResult | { message: string }>} - A promise that resolves to the login result or an error message upon completion.
   */
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() user: IUserLoginData,
  ): Promise<IUserLoginResult | undefined> {
    const result = await this.service.login(user);
    if ('access' in result && 'refresh' in result) {
      return result;
    } else if ('error' in result) {
      throw new HttpException(result.error, HttpStatus.UNAUTHORIZED);
    } else if ('validation' in result) {
      throw new HttpException(result.validation, HttpStatus.BAD_REQUEST);
    }
  }
}
