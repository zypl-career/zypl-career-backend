import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UserService } from '../service/_index.js';
import {
  IMessage,
  IUserLoginResult,
  IUserCreateDataDTO,
  IValidation,
  IError,
  IUserLoginDataDTO,
} from '../types/_index.js';
import { UpdateUserDto } from '../dto/user.dto.js';
import { UserModel } from '../_db/model/user.model.js';

@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  // ---------------------------------------------------------------------------
  // PRIVATE FUNCTION
  // ---------------------------------------------------------------------------
  private handleServiceResult(
    result: any,
    notFoundStatus: HttpStatus,
    validationStatus: HttpStatus,
  ) {
    if ('error' in result) {
      throw new HttpException(result.error, notFoundStatus);
    } else if ('validation' in result) {
      throw new HttpException(result.validation, validationStatus);
    }
    return result;
  }

  // ---------------------------------------------------------------------------
  // REGISTER
  // ---------------------------------------------------------------------------
  @Post('/register')
  @HttpCode(201)
  async register(
    @Body() user: IUserCreateDataDTO,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.register(user);
    return this.handleServiceResult(
      result,
      HttpStatus.FOUND,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  // ---------------------------------------------------------------------------
  // GET USER
  // ---------------------------------------------------------------------------
  @Get(['/get/:id', '/get'])
  async getUser(
    @Param('id') id?: string,
  ): Promise<IError | IValidation | UserModel | UserModel[]> {
    const result = await this.service.getUser(id);
    return this.handleServiceResult(
      result,
      HttpStatus.NOT_FOUND,
      HttpStatus.BAD_REQUEST,
    );
  }

  // ---------------------------------------------------------------------------
  // UPDATE USER
  // ---------------------------------------------------------------------------
  @Patch('/update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedUserData: UpdateUserDto,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.updateUser(id, updatedUserData);
    return this.handleServiceResult(
      result,
      HttpStatus.NOT_FOUND,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  // ---------------------------------------------------------------------------
  // DELETE USER
  // ---------------------------------------------------------------------------
  @Delete('/delete/:id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<IError | IMessage | IValidation> {
    const result = await this.service.deleteUser(id);
    return this.handleServiceResult(
      result,
      HttpStatus.NOT_FOUND,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  // ---------------------------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------------------------
  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() user: IUserLoginDataDTO,
  ): Promise<IUserLoginResult | undefined> {
    const result = await this.service.login(user);
    if ('access' in result && 'refresh' in result) {
      return result;
    } else if ('error' in result) {
      throw new HttpException(result.error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
