import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { EnumCities, EnumGenders, EnumRoles } from '../user/type/index.js';

import { userStatisticsSwagger } from './swagger/index.js';
import { UserStatisticsService } from './statistics.service.js';

@ApiTags('User Statistics')
@Controller('statistics/users')
export class UserStatisticsController {
  constructor(private readonly userStatisticsService: UserStatisticsService) {}

  @Get()
  @ApiQuery({
    name: 'gender',
    required: false,
    enum: EnumGenders,
    description: 'Filter by user gender',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: EnumRoles,
    description: 'Filter by user role',
  })
  @ApiQuery({
    name: 'district',
    required: false,
    enum: EnumCities,
    description: 'Filter by user district',
  })
  @ApiResponse({
    status: userStatisticsSwagger.getStatistics.responses.success.status,
    description: userStatisticsSwagger.getStatistics.responses.success.description,
    schema: userStatisticsSwagger.getStatistics.responses.success.schema,
  })
  @ApiResponse({
    status: userStatisticsSwagger.getStatistics.responses.badRequest.status,
    description: userStatisticsSwagger.getStatistics.responses.badRequest.description,
    schema: userStatisticsSwagger.getStatistics.responses.badRequest.schema,
  })
  async getUserStatistics(
    @Query('gender') gender?: EnumGenders,
    @Query('role') role?: EnumRoles,
    @Query('district') district?: EnumCities,
  ) {
    try {
      return await this.userStatisticsService.getUserStatistics(gender, role, district);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException('Invalid request parameters', HttpStatus.BAD_REQUEST);
    }
  }
}
