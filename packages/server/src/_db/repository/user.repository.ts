import { AppDataSource } from '../../app/globals.app.js';
import { EnumCities } from '../../types/_index.js';
import { UserEntity } from '../entity/_index.js';

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({
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
    gender?: 'male' | 'female';
    age?: number;
    district?: EnumCities;
    emailConfirmed?: boolean;
    role?: 'student' | 'teacher' | 'parents' | 'admin';
    email?: string;
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

    if (emailConfirmed) {
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
  },

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
    gender?: 'male' | 'female';
    age?: number;
    district?: EnumCities;
    role?: 'student' | 'teacher' | 'parents' | 'admin';
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

    if (emailConfirmed) {
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
  },
});
