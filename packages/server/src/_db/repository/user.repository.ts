import { AppDataSource } from '../../app/globals.app.js';
import { UserEntity } from '../entity/_index.js';

export const UserRepository = AppDataSource.getRepository(UserEntity).extend(
  {},
);
