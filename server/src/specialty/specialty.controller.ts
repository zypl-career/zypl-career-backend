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
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IError, IMessage, IValidation } from '../type/base.js';

import { SpecialtyModel } from './_db/model/index.js';
import { specialtySwagger } from './swagger/index.js';
import {
  ISpecialtyCreateDataDTO,
  ISpecialtyGetDataDTO,
  ISpecialtyUpdateDataDTO,
} from './type/index.js';
import { SpecialtyService } from './specialty.service.js';

@ApiTags('specialty')
@Controller('/specialty')
export class SpecialtyController {
  constructor(private readonly service: SpecialtyService) {}

  private handleServiceResult(result: any) {
    if ('error' in result) {
      throw new HttpException(result.error, HttpStatus.NOT_FOUND);
    } else if ('validation' in result) {
      throw new HttpException(result.validation, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return result;
  }

  @Post('/create')
  @HttpCode(201)
  @ApiOperation(specialtySwagger.create.summary)
  @ApiBody(specialtySwagger.create.body)
  @ApiResponse(specialtySwagger.create.responses.success)
  @ApiResponse(specialtySwagger.create.responses.validation)
  async createSpecialty(
    @Body() specialty: ISpecialtyCreateDataDTO,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.create(specialty);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // GET SPECIALTY
  // ---------------------------------------------------------------------------
  @Get('/get/:id')
  @ApiOperation(specialtySwagger.get.summary)
  @ApiParam(specialtySwagger.get.param)
  @ApiResponse(specialtySwagger.get.responses.successId)
  @ApiResponse(specialtySwagger.get.responses.notFound)
  @ApiResponse(specialtySwagger.get.responses.badRequest)
  async getById(
    @Param('id') id?: string,
  ): Promise<IError | IValidation | SpecialtyModel | SpecialtyModel[]> {
    const result = await this.service.get(id);
    return this.handleServiceResult(result);
  }

  @Get('/get')
  @ApiOperation(specialtySwagger.get.summary)
  @ApiQuery(specialtySwagger.filter.query)
  @ApiResponse(specialtySwagger.get.responses.success)
  @ApiResponse(specialtySwagger.get.responses.notFound)
  @ApiResponse(specialtySwagger.get.responses.badRequest)
  async get(
    @Query() filters: ISpecialtyGetDataDTO,
  ): Promise<IError | IValidation | SpecialtyModel | SpecialtyModel[]> {
    const result = await this.service.get(undefined, filters);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // UPDATE SPECIALTY
  // ---------------------------------------------------------------------------
  @Patch('/update/:id')
  @ApiOperation(specialtySwagger.update.summary)
  @ApiParam(specialtySwagger.update.param)
  @ApiBody(specialtySwagger.update.body)
  @ApiResponse(specialtySwagger.update.responses.success)
  @ApiResponse(specialtySwagger.update.responses.notFound)
  @ApiResponse(specialtySwagger.update.responses.validation)
  async updateSpecialty(
    @Param('id') id: string,
    @Body() updatedSpecialtyData: ISpecialtyUpdateDataDTO,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.update(id, updatedSpecialtyData);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // DELETE SPECIALTY
  // ---------------------------------------------------------------------------
  @Delete('/delete/:id')
  @ApiOperation(specialtySwagger.delete.summary)
  @ApiParam(specialtySwagger.delete.param)
  @ApiResponse(specialtySwagger.delete.responses.success)
  @ApiResponse(specialtySwagger.delete.responses.notFound)
  @ApiResponse(specialtySwagger.delete.responses.validation)
  async deleteSpecialty(@Param('id') id: string): Promise<IError | IMessage | IValidation> {
    const result = await this.service.delete(id);
    return this.handleServiceResult(result);
  }
}
