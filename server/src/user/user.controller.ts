import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IError, IMessage, IValidation } from '../type/index.js';

import { UserModel } from './_db/model/index.js';
import { GetUserDto, VerifyEmailDto } from './dto/index.js';
import { userSwagger } from './swagger/index.js';
import {
  IUserCreateDataDTO,
  IUserLoginDataDTO,
  IUserLoginResult,
  IUserUpdateDataDTO,
} from './type/index.js';
import { UserService } from './user.service.js';
import { Response } from 'express';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  // ---------------------------------------------------------------------------
  // PRIVATE FUNCTIONS
  // ---------------------------------------------------------------------------

  private handleServiceResult(result: any) {
    if ('error' in result) {
      throw new HttpException(result.error, HttpStatus.NOT_FOUND);
    } else if ('validation' in result) {
      throw new HttpException(result.validation, HttpStatus.UNPROCESSABLE_ENTITY);
    } else if ('conflict' in result) {
      throw new HttpException(result.conflict, HttpStatus.CONFLICT);
    } else if ('unauthorized' in result) {
      throw new HttpException(result.unauthorized, HttpStatus.UNAUTHORIZED);
    }

    return result;
  }

  // ---------------------------------------------------------------------------
  // CREATE USER
  // ---------------------------------------------------------------------------
  @Post('/create')
  @HttpCode(201)
  @ApiOperation(userSwagger.create.summary)
  @ApiBody(userSwagger.create.body)
  @ApiResponse(userSwagger.create.responses.success)
  @ApiResponse(userSwagger.create.responses.validation)
  @ApiResponse(userSwagger.create.responses.conflict)
  async createUser(@Body() createUserDto: IUserCreateDataDTO): Promise<IMessage | IValidation> {
    const result = await this.service.create(createUserDto);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // GET USER BY ID
  // ---------------------------------------------------------------------------
  @Get('/get/:id')
  @ApiOperation(userSwagger.get.summary)
  @ApiParam(userSwagger.get.param)
  @ApiResponse(userSwagger.get.responses.success)
  @ApiResponse(userSwagger.get.responses.notFound)
  @ApiResponse(userSwagger.get.responses.badRequest)
  async getUser(@Param('id') id: string): Promise<IError | IValidation | UserModel> {
    const result = await this.service.get(id);
    return this.handleServiceResult(result);
  }

  @Get('/get')
  @ApiOperation(userSwagger.getAll.summary)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by name (partial match)',
    type: String,
  })
  @ApiQuery({
    name: 'surname',
    required: false,
    description: 'Filter by surname (partial match)',
    type: String,
  })
  @ApiQuery({
    name: 'gender',
    required: false,
    description: 'Filter by gender',
    type: String,
    enum: ['male', 'female'],
  })
  @ApiQuery({
    name: 'age',
    required: false,
    description: 'Filter by age',
    type: Number,
  })
  @ApiQuery({
    name: 'district',
    required: false,
    description: 'Filter by district',
    type: String,
  })
  @ApiQuery({
    name: 'role',
    required: false,
    description: 'Filter by role',
    type: String,
    enum: ['student', 'teacher', 'parents'],
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Filter by email (partial match)',
    type: String,
  })
  @ApiResponse(userSwagger.getAll.responses.success)
  @ApiResponse(userSwagger.getAll.responses.notFound)
  async getUsers(
    @Query() getUsersDto: GetUserDto,
  ): Promise<IError | IValidation | UserModel[] | UserModel> {
    const result = await this.service.get(undefined, getUsersDto);
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
    @Body() updateUserDto: IUserUpdateDataDTO,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.update(id, updateUserDto);
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
  async deleteUser(@Param('id') id: string): Promise<IMessage | IError | IValidation> {
    const result = await this.service.delete(id);
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
  async login(@Body() user: IUserLoginDataDTO): Promise<IUserLoginResult | undefined> {
    const result = await this.service.login(user);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // EMAIL VERIFICATION
  // ---------------------------------------------------------------------------
  @Post('/verify-email')
  @HttpCode(200)
  @ApiOperation(userSwagger.verifyEmail.summary)
  @ApiBody(userSwagger.verifyEmail.body)
  @ApiResponse(userSwagger.verifyEmail.responses.success)
  @ApiResponse(userSwagger.verifyEmail.responses.validation)
  @ApiResponse(userSwagger.verifyEmail.responses.notFound)
  async verifyEmail(
    @Body() verifyEmailDto: VerifyEmailDto,
  ): Promise<IMessage | IValidation | IError> {
    const result = await this.service.verifyEmail(verifyEmailDto.email, verifyEmailDto.code);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // SEND CODE TO EMAIL
  // ---------------------------------------------------------------------------
  @Post('/send-code')
  @HttpCode(200)
  @ApiOperation(userSwagger.sendCodeToEmail.summary)
  @ApiBody(userSwagger.sendCodeToEmail.body)
  @ApiResponse(userSwagger.sendCodeToEmail.responses.success)
  @ApiResponse(userSwagger.sendCodeToEmail.responses.notFound)
  @ApiResponse(userSwagger.sendCodeToEmail.responses.validation)
  async sendCodeToEmail(@Body('email') email: string): Promise<IMessage | IValidation | IError> {
    const result = await this.service.sendCodeToEmail(email);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // CHANGE PASSWORD
  // ---------------------------------------------------------------------------
  @Post('/change-password')
  @HttpCode(200)
  @ApiOperation(userSwagger.changePassword.summary)
  @ApiBody(userSwagger.changePassword.body)
  @ApiResponse(userSwagger.changePassword.responses.success)
  @ApiResponse(userSwagger.changePassword.responses.validation)
  @ApiResponse(userSwagger.changePassword.responses.notFound)
  async changePassword(
    @Body('email') email: string,
    @Body('code') code: number,
    @Body('newPassword') newPassword: string,
  ): Promise<IMessage | IError | IValidation> {
    const result = await this.service.changePassword(email, code, newPassword);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // ACCESS PARENT
  // ---------------------------------------------------------------------------

  @Post('/access-parent/:parentId')
  @HttpCode(200)
  @ApiOperation(userSwagger.getAccessParent.summary)
  @ApiParam(userSwagger.getAccessParent.param)
  @ApiResponse(userSwagger.getAccessParent.responses.success)
  @ApiResponse(userSwagger.getAccessParent.responses.error)
  async getAccessParent(
    @Param('parentId') parentId: string,
    @Headers('authorization') auth: string,
  ): Promise<IMessage | IError> {
    const token = auth && (auth.split(' ')[1] as string);
    const result = await this.service.getAccessParent(parentId, token);
    return this.handleServiceResult(result);
  }

  @Get('/export')
  @ApiOperation({ summary: 'Export articles as Excel' })
  @ApiResponse({ status: 200, description: 'Excel file successfully generated' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async exportToExcel(@Res() res: Response): Promise<void> {
    try {
      const buffer = await this.service.exportToExcel();

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=articles.xlsx');
      res.end(buffer);
    } catch (error) {
      throw new HttpException(
        { error: `Failed to generate Excel file: ${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
