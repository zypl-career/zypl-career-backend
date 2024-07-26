import { AppDataSource } from '../../app/globals.app.js';
import { UniversityEntity } from '../entity/_index.js';

export const UniversityRepository = AppDataSource.getRepository(
  UniversityEntity,
).extend({});
