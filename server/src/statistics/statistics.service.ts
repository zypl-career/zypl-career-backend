import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/_db/entity/index.js';
import { EnumCities, EnumGenders, EnumRoles } from '../user/type/index.js';

@Injectable()
export class UserStatisticsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserStatistics(
    gender?: EnumGenders,
    role?: EnumRoles,
    district?: EnumCities,
  ): Promise<any> {
    const query = this.userRepository.createQueryBuilder('user');

    if (gender) {
      query.andWhere('user.gender = :gender', { gender });
    }

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    if (district) {
      query.andWhere('user.district = :district', { district });
    }

    const totalUsers = await query.getCount();

    // Statistics by gender
    const usersByGender = await this.userRepository
      .createQueryBuilder('user')
      .select('user.gender, COUNT(user.id) as count')
      .where(gender ? 'user.gender = :gender' : '1=1', { gender })
      .groupBy('user.gender')
      .getRawMany();

    // Statistics by role
    const usersByRole = await this.userRepository
      .createQueryBuilder('user')
      .select('user.role, COUNT(user.id) as count')
      .where(role ? 'user.role = :role' : '1=1', { role })
      .groupBy('user.role')
      .getRawMany();

    // Statistics by district
    const usersByDistrict = await this.userRepository
      .createQueryBuilder('user')
      .select('user.district, COUNT(user.id) as count')
      .where(district ? 'user.district = :district' : '1=1', { district })
      .groupBy('user.district')
      .getRawMany();

    return {
      totalUsers,
      usersByGender,
      usersByRole,
      usersByDistrict,
    };
  }
}
