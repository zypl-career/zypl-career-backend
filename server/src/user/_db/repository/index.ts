import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { EnumCities, EnumGenders, EnumRoles } from '../../type/index.js';
import { UserEntity } from '../entity/index.js';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findWithFilters({
    name,
    surname,
    gender,
    age,
    district,
    role,
    email,
    emailConfirmed,
    skip,
    take,
  }: {
    name?: string;
    surname?: string;
    gender?: EnumGenders;
    age?: number;
    district?: EnumCities;
    role?: EnumRoles;
    email?: string;
    emailConfirmed?: boolean;
    skip?: number;
    take?: number;
  }): Promise<UserEntity[]> {
    const queryBuilder = this.createQueryBuilder('users');

    if (name) {
      queryBuilder.andWhere('users.name ILIKE :name', { name: `%${name}%` });
    }

    if (surname) {
      queryBuilder.andWhere('users.surname ILIKE :surname', {
        surname: `%${surname}%`,
      });
    }

    if (gender) {
      queryBuilder.andWhere('users.gender = :gender', { gender });
    }

    if (emailConfirmed !== undefined) {
      queryBuilder.andWhere('users.emailConfirmed = :emailConfirmed', {
        emailConfirmed,
      });
    }

    if (age !== undefined) {
      queryBuilder.andWhere('users.age = :age', { age });
    }

    if (district) {
      queryBuilder.andWhere('users.district = :district', { district });
    }

    if (role) {
      queryBuilder.andWhere('users.role = :role', { role });
    }

    if (email) {
      queryBuilder.andWhere('users.email ILIKE :email', {
        email: `%${email}%`,
      });
    }

    return queryBuilder.skip(skip).take(take).getMany();
  }

  async countWithFilters({
    name,
    surname,
    gender,
    age,
    district,
    role,
    email,
    emailConfirmed,
  }: {
    name?: string;
    surname?: string;
    gender?: EnumGenders;
    age?: number;
    district?: EnumCities;
    role?: EnumRoles;
    email?: string;
    emailConfirmed?: boolean;
  }): Promise<number> {
    const queryBuilder = this.createQueryBuilder('users');

    if (name) {
      queryBuilder.andWhere('users.name ILIKE :name', { name: `%${name}%` });
    }

    if (surname) {
      queryBuilder.andWhere('users.surname ILIKE :surname', {
        surname: `%${surname}%`,
      });
    }

    if (emailConfirmed !== undefined) {
      queryBuilder.andWhere('users.emailConfirmed = :emailConfirmed', {
        emailConfirmed,
      });
    }

    if (gender) {
      queryBuilder.andWhere('users.gender = :gender', { gender });
    }

    if (age !== undefined) {
      queryBuilder.andWhere('users.age = :age', { age });
    }

    if (district) {
      queryBuilder.andWhere('users.district = :district', { district });
    }

    if (role) {
      queryBuilder.andWhere('users.role = :role', { role });
    }

    if (email) {
      queryBuilder.andWhere('users.email ILIKE :email', {
        email: `%${email}%`,
      });
    }

    return queryBuilder.getCount();
  }
}
