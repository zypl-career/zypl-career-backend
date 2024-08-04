import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ResultModalService } from '../service/test.service.js';
import { ResultModalDto } from '../dto/test.dto.js';
import { IError, IMessage, IValidation } from '../types/base.js';
import { resultModalSwagger } from '../swagger/test.swagger.js';

@ApiTags('result-modal')
@Controller('/result-modal')
export class ResultModalController {
  constructor(private readonly resultModalService: ResultModalService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation(resultModalSwagger.process.summary)
  @ApiBody(resultModalSwagger.process.body)
  @ApiResponse(resultModalSwagger.process.responses.success)
  @ApiResponse(resultModalSwagger.process.responses.unauthorized)
  @ApiResponse(resultModalSwagger.process.responses.error)
  async processResultModal(
    @Body() requestData: ResultModalDto,
  ): Promise<IMessage | IValidation | IError> {
    const result = await this.resultModalService.handleResultModal(requestData);
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
}
