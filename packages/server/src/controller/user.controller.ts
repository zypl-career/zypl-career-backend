import { UserService } from '../service/_index.js';

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

import {
  IMessage,
  IUserLoginResult,
  IUserCreateDataDTO,
  IValidation,
  IError,
  IUserLoginDataDTO,
} from '../types/_index.js';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto/user.dto.js';

import { UserModel } from '../_db/model/user.model.js';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('user')
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
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 302, description: 'User already exists' })
  @ApiResponse({ status: 422, description: 'Validation error' })
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
  @ApiOperation({ summary: 'Get user by ID or all users' })
  @ApiParam({ name: 'id', required: false, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User(s) retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 422, description: 'Validation error' })
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
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 422, description: 'Validation error' })
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
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 422, description: 'Login failed' })
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
