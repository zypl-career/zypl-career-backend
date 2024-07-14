import { EntitySchema } from 'typeorm';
import { UserModel } from '../model/_index.js';

export const UserEntity = new EntitySchema<UserModel>({
  name: 'UserEntity',
  tableName: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      unique: true,
    },
    name: {
      type: 'varchar',
    },
    surname: {
      type: 'varchar',
    },
    patronymic: {
      type: 'varchar',
      nullable: true,
    },
    gender: {
      type: 'enum',
      enum: ['male', 'female'],
    },
    age: {
      type: 'int',
      nullable: true,
    },
    district: {
      type: 'varchar',
      nullable: true,
    },
    role: {
      type: 'enum',
      enum: ['student', 'teacher', 'parents'],
    },
    school: {
      type: 'varchar',
      nullable: true,
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    deletedAt: {
      type: 'timestamp',
      deleteDate: true,
      nullable: true,
    },
  },
});
