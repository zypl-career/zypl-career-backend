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
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IError, IMessage, IValidation } from '../type/index.js';
import { EnumCities } from '../user/type/index.js';

import { UniversityModel } from './_db/model/index.js';
import { UpdateUniversityDto } from './dto/index.js';
import { universitySwagger } from './swagger/index.js';
import { IUniversityCreateDataDTO, IUniversityGetDataDTO } from './type/index.js';
import { UniversityService } from './university.service.js';
import { Response } from 'express';

@ApiTags('university')
@Controller('/university')
export class UniversityController {
  constructor(private readonly service: UniversityService) {}

  // ---------------------------------------------------------------------------
  // PRIVATE FUNCTION
  // ---------------------------------------------------------------------------
  private handleServiceResult(result: any) {
    if ('error' in result) {
      throw new HttpException(result.error, HttpStatus.NOT_FOUND);
    } else if ('validation' in result) {
      throw new HttpException(result.validation, HttpStatus.UNPROCESSABLE_ENTITY);
    } else if ('conflict' in result) {
      throw new HttpException(result.conflict, HttpStatus.CONFLICT);
    }
    return result;
  }

  // ---------------------------------------------------------------------------
  // REGISTER
  // ---------------------------------------------------------------------------
  @Post('/create')
  @HttpCode(201)
  @ApiOperation(universitySwagger.create.summary)
  @ApiBody(universitySwagger.create.body)
  @ApiResponse(universitySwagger.create.responses.success)
  @ApiResponse(universitySwagger.create.responses.conflict)
  @ApiResponse(universitySwagger.create.responses.validation)
  async register(@Body() university: IUniversityCreateDataDTO): Promise<IMessage | IValidation> {
    const result = await this.service.create(university);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // GET UNIVERSITY
  // ---------------------------------------------------------------------------
  @Get('/get/:id')
  @ApiOperation(universitySwagger.get.summary)
  @ApiParam(universitySwagger.get.param)
  @ApiResponse(universitySwagger.get.responses.success)
  @ApiResponse(universitySwagger.get.responses.notFound)
  @ApiResponse(universitySwagger.get.responses.badRequest)
  async getUniversity(
    @Param('id') id: string,
  ): Promise<IError | IValidation | UniversityModel | UniversityModel[]> {
    const result = await this.service.get(id);
    return this.handleServiceResult(result);
  }

  @Get('/get')
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
    name: 'city',
    required: false,
    description: 'Filter by city ',
    type: String,
    enum: EnumCities,
  })
  @ApiOperation(universitySwagger.get.summary)
  @ApiParam(universitySwagger.get.param)
  @ApiResponse(universitySwagger.get.responses.success)
  @ApiResponse(universitySwagger.get.responses.notFound)
  @ApiResponse(universitySwagger.get.responses.badRequest)
  async getUsers(
    @Query() getUsersDto: IUniversityGetDataDTO,
  ): Promise<IError | IValidation | UniversityModel[] | UniversityModel> {
    const result = await this.service.get(undefined, getUsersDto);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // UPDATE UNIVERSITY
  // ---------------------------------------------------------------------------
  @Patch('/update/:id')
  @ApiOperation(universitySwagger.update.summary)
  @ApiParam(universitySwagger.update.param)
  @ApiBody(universitySwagger.update.body)
  @ApiResponse(universitySwagger.update.responses.success)
  @ApiResponse(universitySwagger.update.responses.notFound)
  @ApiResponse(universitySwagger.update.responses.validation)
  async updateUniversity(
    @Param('id') id: string,
    @Body() updatedUniversityData: UpdateUniversityDto,
  ): Promise<IMessage | IValidation> {
    const result = await this.service.update(id, updatedUniversityData);
    return this.handleServiceResult(result);
  }

  // ---------------------------------------------------------------------------
  // DELETE UNIVERSITY
  // ---------------------------------------------------------------------------
  @Delete('/delete/:id')
  @ApiOperation(universitySwagger.delete.summary)
  @ApiParam(universitySwagger.delete.param)
  @ApiResponse(universitySwagger.delete.responses.success)
  @ApiResponse(universitySwagger.delete.responses.notFound)
  @ApiResponse(universitySwagger.delete.responses.validation)
  async deleteUniversity(@Param('id') id: string): Promise<IError | IMessage | IValidation> {
    const result = await this.service.delete(id);
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
