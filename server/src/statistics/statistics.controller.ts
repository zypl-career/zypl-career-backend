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
  @ApiQuery({ name: 'gender', required: false, enum: EnumGenders })
  @ApiQuery({ name: 'role', required: false, enum: EnumRoles })
  @ApiQuery({ name: 'district', required: false, enum: EnumCities })
  @ApiQuery({
    name: 'ageRanges',
    required: false,
    type: String,
    description: 'Age ranges to filter by (e.g., [[12,22],[30,44]])',
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
    @Query('ageRanges') ageRanges?: string,
  ) {
    try {
      const parsedAgeRanges = ageRanges ? JSON.parse(ageRanges) : undefined;

      if (
        parsedAgeRanges &&
        (!Array.isArray(parsedAgeRanges) ||
          parsedAgeRanges.some((range) => !Array.isArray(range) || range.length !== 2))
      ) {
        throw new Error(
          'Invalid age ranges format. Each range must be an array of two numbers (e.g., [[12,22],[30,44]])',
        );
      }

      return await this.userStatisticsService.getUserStatistics(
        gender,
        role,
        district,
        parsedAgeRanges,
      );
    } catch (error) {
      throw new HttpException('Invalid request parameters', HttpStatus.BAD_REQUEST);
    }
  }
}
