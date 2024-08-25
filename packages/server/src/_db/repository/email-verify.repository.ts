import { AppDataSource } from '../../app/globals.app.js';
import { EmailVerifyEntity } from '../entity/_index.js';

export const EmailVerifyRepository = AppDataSource.getRepository(
  EmailVerifyEntity,
).extend({});
