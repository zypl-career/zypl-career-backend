import { AppDataSource } from '../../app/globals.app.js';
import { TestEntity } from '../entity/_index.js';

export const TestRepository = AppDataSource.getRepository(TestEntity).extend(
  {},
);
