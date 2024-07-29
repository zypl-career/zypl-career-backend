import { AppDataSource } from '../../app/globals.app.js';
import { PartnerEntity } from '../entity/_index.js';

export const PartnerRepository = AppDataSource.getRepository(
  PartnerEntity,
).extend({});
