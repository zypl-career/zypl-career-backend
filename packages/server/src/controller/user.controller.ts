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
  Query,
} from '@nestjs/common';

import {
  IUserLoginResult,
  IUserCreateDataDTO,
  IUserLoginDataDTO,
} from '../types/_index.js';
import { PaginationDto, UpdateUserDto } from '../dto/user.dto.js';

import { UserModel } from '../_db/model/user.model.js';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { userSwagger } from '../swagger/_index.js';
import { IError, IMessage, IValidation } from '../types/_index.js';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  // ---------------------------------------------------------------------------
  // PRIVATE FUNCTION
  // ---------------------------------------------------------------------------
  private handleServiceResult(result: any) {
    if ('error' in result) {
      throw new HttpException(result.error, HttpStatus.NOT_FOUND);
    } else if ('validation' in result) {
      throw new HttpException(
        result.validation,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else if ('conflict' in result) {
      throw new HttpException(result.conflict, HttpStatus.CONFLICT);
    }
    return result;
  }

  // ---------------------------------------------------------------------------
  // REGISTER
  // ---------------------------------------------------------------------------
  @Post('/register')
  @HttpCode(201)
  @ApiOperation(userSwagger.register.summary)
  @ApiBody(userSwagger.register.body)
  @ApiResponse(userSwagger.register.responses.success)
  @ApiResponse(userSwagger.register.responses.conflict)
  @ApiResponse(userSwagger.register.responses.validation)
  async register(
    @Body() user: IUserCreateDataDTO,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.register(user);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // GET USER
  // ---------------------------------------------------------------------------
  @Get(['/get/:id', '/get'])
  @ApiOperation(userSwagger.get.summary)
  @ApiParam(userSwagger.get.param)
  @ApiResponse(userSwagger.get.responses.success)
  @ApiResponse(userSwagger.get.responses.notFound)
  @ApiResponse(userSwagger.get.responses.badRequest)
  async getUser(
    @Param('id') id?: string,
    @Query() paginationDto?: PaginationDto,
  ): Promise<IError | IValidation | UserModel | UserModel[]> {
    const result = await this.service.getUser(id, paginationDto);
    return this.handleServiceResult(result);
  }
  // ---------------------------------------------------------------------------
  // UPDATE USER
  // ---------------------------------------------------------------------------
  @Patch('/update/:id')
  @ApiOperation(userSwagger.update.summary)
  @ApiParam(userSwagger.update.param)
  @ApiBody(userSwagger.update.body)
  @ApiResponse(userSwagger.update.responses.success)
  @ApiResponse(userSwagger.update.responses.notFound)
  @ApiResponse(userSwagger.update.responses.validation)
  async updateUser(
    @Param('id') id: string,
    @Body() updatedUserData: UpdateUserDto,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.updateUser(id, updatedUserData);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // DELETE USER
  // ---------------------------------------------------------------------------
  @Delete('/delete/:id')
  @ApiOperation(userSwagger.delete.summary)
  @ApiParam(userSwagger.delete.param)
  @ApiResponse(userSwagger.delete.responses.success)
  @ApiResponse(userSwagger.delete.responses.notFound)
  @ApiResponse(userSwagger.delete.responses.validation)
  async deleteUser(
    @Param('id') id: string,
  ): Promise<IError | IMessage | IValidation> {
    const result = await this.service.deleteUser(id);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------------------------
  @Post('/login')
  @HttpCode(200)
  @ApiOperation(userSwagger.login.summary)
  @ApiBody(userSwagger.login.body)
  @ApiResponse(userSwagger.login.responses.success)
  @ApiResponse(userSwagger.login.responses.validation)
  async login(
    @Body() user: IUserLoginDataDTO,
  ): Promise<IUserLoginResult | undefined> {
    const result = await this.service.login(user);
    return this.handleServiceResult(result);
  }
}
