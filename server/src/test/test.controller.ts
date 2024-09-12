import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IError, IMessage, IValidation } from '../type/base.js';

import { createTestModalDto, getTestDTO } from './dto/index.js';
import { testSwagger } from './swagger/index.js';
import { TestService } from './test.service.js';

@ApiTags('test')
@Controller('/test')
export class TestController {
  constructor(private readonly testService: TestService) {}
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
  // PRIVATE FUNCTIONS
  // ---------------------------------------------------------------------------
  @Post()
  @HttpCode(200)
  @ApiOperation(testSwagger.process.summary)
  @ApiBody(testSwagger.process.body)
  @ApiResponse(testSwagger.process.responses.success)
  @ApiResponse(testSwagger.process.responses.error)
  async processResultModal(
    @Body() requestData: createTestModalDto,
    @Headers('authorization') auth: string,
  ): Promise<IMessage | IValidation | IError> {
    const token = auth && (auth.split(' ')[1] as string);
    const result = await this.testService.create(requestData, token);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  @Get('/get')
  @HttpCode(200)
  @ApiOperation(testSwagger.get.summary)
  @ApiQuery(testSwagger.get.query)
  @ApiResponse(testSwagger.get.responses.success)
  async get(@Headers('authorization') auth: string, @Query() filters: getTestDTO) {
    const token = auth && (auth.split(' ')[1] as string);
    const result = await this.testService.get(filters, token);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  @Get('/get/:id')
  @HttpCode(200)
  @ApiOperation(testSwagger.get.summary)
  @ApiParam(testSwagger.get.param)
  @ApiResponse(testSwagger.get.responses.success_id)
  async getById(@Headers('authorization') auth: string, @Param('id') id: string) {
    const token = auth && (auth.split(' ')[1] as string);
    const result = await this.testService.get(undefined, token, id);
    return this.handleServiceResult(result);
  }
}
