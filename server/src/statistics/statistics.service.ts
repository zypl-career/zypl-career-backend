import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';

import { UserEntity } from '../user/_db/entity/index.js';
import { EnumCities, EnumGenders, EnumRoles } from '../user/type/index.js';
import ExcelJS from 'exceljs';

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
    ageRanges?: [number, number][],
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

    // Fill missing districts with count 0
    const allDistricts = Object.values(EnumCities);
    const completeDistrictStats = allDistricts.map((city) => ({
      district: city,
      count: usersByDistrict.find((item) => item.district === city)?.count || 0,
    }));

    // Statistics for each age range
    const ageRangeStats = ageRanges
      ? await Promise.all(
          ageRanges.map(async ([start, end]) => ({
            range: `[${start}, ${end}]`,
            count: await this.userRepository.count({
              where: { age: Between(start, end) },
            }),
          })),
        )
      : [];

    return {
      totalUsers,
      usersByGender,
      usersByRole,
      usersByDistrict: completeDistrictStats,
      ageRangeStats,
    };
  }

  // ---------------------------------------------------------------------------
  // EXPORT
  // ---------------------------------------------------------------------------
  async exportToExcel(): Promise<ExcelJS.Buffer> {
    const db = await this.userRepository.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Statistics');

    const headers = Object.keys(db[0] || {}).map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      key: key,
      width: 30,
    }));

    worksheet.columns = headers;

    db.forEach((article) => {
      worksheet.addRow(article);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
