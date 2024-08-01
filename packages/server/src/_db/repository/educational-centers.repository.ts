import { AppDataSource } from '../../app/globals.app.js';
import { EducationCenterEntity } from '../entity/_index.js';

export const EducationCenterRepository = AppDataSource.getRepository(
  EducationCenterEntity,
).extend({});
