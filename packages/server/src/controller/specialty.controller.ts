import { SpecialtyService } from '../service/specialty.service.js';
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
  ISpecialtyCreateDataDTO,
  ISpecialtyUpdateDataDTO,
  ISpecialtyFilterDTO,
} from '../types/_index.js';
import { SpecialtyModel } from '../_db/model/specialty.model.js';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { specialtySwagger } from '../swagger/specialty.swagger.js';
import {
  IError,
  IMessage,
  IValidation,
  IPaginationResponse,
} from '../types/_index.js';

@ApiTags('specialty')
@Controller('/specialty')
export class SpecialtyController {
  constructor(private readonly service: SpecialtyService) {}

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
    }
    return result;
  }

  // ---------------------------------------------------------------------------
  // CREATE SPECIALTY
  // ---------------------------------------------------------------------------
  @Post('/create')
  @HttpCode(201)
  @ApiOperation(specialtySwagger.create.summary)
  @ApiBody(specialtySwagger.create.body)
  @ApiResponse(specialtySwagger.create.responses.success)
  @ApiResponse(specialtySwagger.create.responses.validation)
  async createSpecialty(
    @Body() specialty: ISpecialtyCreateDataDTO,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.createSpecialty(specialty);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // GET SPECIALTY
  // ---------------------------------------------------------------------------
  @Get(['/get/:id', '/get'])
  @ApiOperation(specialtySwagger.get.summary)
  @ApiParam(specialtySwagger.get.param)
  @ApiResponse(specialtySwagger.get.responses.success)
  @ApiResponse(specialtySwagger.get.responses.notFound)
  @ApiResponse(specialtySwagger.get.responses.badRequest)
  async getSpecialty(
    @Param('id') id?: string,
  ): Promise<IError | IValidation | SpecialtyModel | SpecialtyModel[]> {
    const result = await this.service.getSpecialty(id);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // FILTER SPECIALTY
  // ---------------------------------------------------------------------------
  @Get('/filter')
  @ApiOperation(specialtySwagger.filter.summary)
  @ApiQuery(specialtySwagger.filter.query)
  @ApiResponse(specialtySwagger.filter.responses.success)
  @ApiResponse(specialtySwagger.filter.responses.validation)
  async filterSpecialty(
    @Query() filters: ISpecialtyFilterDTO,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<IPaginationResponse<SpecialtyModel> | IValidation | IError> {
    const result = await this.service.filterSpecialty(filters, page, limit);
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
    const result = await this.service.updateSpecialty(id, updatedSpecialtyData);
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
  async deleteSpecialty(
    @Param('id') id: string,
  ): Promise<IError | IMessage | IValidation> {
    const result = await this.service.deleteSpecialty(id);
    return this.handleServiceResult(result);
  }
}
