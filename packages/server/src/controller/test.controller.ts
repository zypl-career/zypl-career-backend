import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  HttpException,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ResultModelService } from '../service/test.service.js';
import { createTestModalDto, getTestDTO } from '../dto/test.dto.js';
import { IError, IMessage, IValidation } from '../types/base.js';
import { resultModalSwagger } from '../swagger/test.swagger.js';

@ApiTags('result-modal')
@Controller('/result-modal')
export class ResultModalController {
  constructor(private readonly resultModalService: ResultModelService) {}
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
  @ApiOperation(resultModalSwagger.process.summary)
  @ApiBody(resultModalSwagger.process.body)
  @ApiResponse(resultModalSwagger.process.responses.success)
  @ApiResponse(resultModalSwagger.process.responses.unauthorized)
  @ApiResponse(resultModalSwagger.process.responses.error)
  async processResultModal(
    @Body() requestData: createTestModalDto,
    @Headers('authorization') auth: string,
  ): Promise<IMessage | IValidation | IError> {
    const token = auth && (auth.split(' ')[1] as string);
    const result = await this.resultModalService.create(requestData, token);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  @Get('/get')
  @HttpCode(200)
  @ApiOperation(resultModalSwagger.get.summary)
  @ApiQuery(resultModalSwagger.get.query)
  @ApiResponse(resultModalSwagger.get.responses.success)
  async get(
    @Headers('authorization') auth: string,
    @Query() filters: getTestDTO,
  ) {
    const token = auth && (auth.split(' ')[1] as string);
    const result = await this.resultModalService.get(filters, token);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // GET
  // ---------------------------------------------------------------------------
  @Get('/get/:id')
  @HttpCode(200)
  @ApiOperation(resultModalSwagger.get.summary)
  @ApiParam(resultModalSwagger.get.param)
  @ApiResponse(resultModalSwagger.get.responses.success_id)
  async getById(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
  ) {
    const token = auth && (auth.split(' ')[1] as string);
    const result = await this.resultModalService.get(undefined, token, id);
    return this.handleServiceResult(result);
  }
}
