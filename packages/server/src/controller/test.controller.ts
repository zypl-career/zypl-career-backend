import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  HttpException,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ResultModelService } from '../service/test.service.js';
import { createTestModalDto } from '../dto/test.dto.js';
import { IError, IMessage, IValidation } from '../types/base.js';
import { resultModalSwagger } from '../swagger/test.swagger.js';

@ApiTags('result-modal')
@Controller('/result-modal')
export class ResultModalController {
  constructor(private readonly resultModalService: ResultModelService) {}

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
    if ('error' in result) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    } else if ('validation' in result) {
      throw new HttpException(
        result.validation,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return result;
  }

  @Get('/get')
  @HttpCode(200)
  @ApiOperation(resultModalSwagger.process.summary)
  // @ApiBody(resultModalSwagger.process.body)
  // @ApiResponse(resultModalSwagger.process.responses.success)
  // @ApiResponse(resultModalSwagger.process.responses.unauthorized)
  // @ApiResponse(resultModalSwagger.process.responses.error)
  async get() {
    const result = await this.resultModalService.get();
    return result;
  }
}
