import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { userSwagger } from '../swagger/user.swagger.js';
import {
  IError,
  IMessage,
  IUserLoginDataDTO,
  IUserLoginResult,
  IValidation,
} from '../types/_index.js';
import { CreateUserDto, GetUserDto, UpdateUserDto } from '../dto/user.dto.js';
import { UserService } from '../service/user.service.js';
import { UserModel } from '../_db/model/user.model.js';

@ApiTags('user')
@Controller('/user')
export class UsersController {
  constructor(private readonly service: UserService) {}

  // ---------------------------------------------------------------------------
  // PRIVATE FUNCTIONS
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
    } else if ('unauthorized') {
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
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IMessage | IValidation> {
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
  async getUser(
    @Param('id') id: string,
  ): Promise<IError | IValidation | UserModel> {
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
    @Body() updateUserDto: UpdateUserDto,
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
  async deleteUser(
    @Param('id') id: string,
  ): Promise<IMessage | IError | IValidation> {
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
  async login(
    @Body() user: IUserLoginDataDTO,
  ): Promise<IUserLoginResult | undefined> {
    const result = await this.service.login(user);
    return this.handleServiceResult(result);
  }
}
