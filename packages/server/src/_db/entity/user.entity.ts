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
    login: {
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
