import { DataSource } from 'typeorm';

import * as entities from '../_db/entity/_index.js';

import { Config } from './config.app.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: Config.db.connection,
  synchronize: true,
  logging: true,
  entities,
  migrationsRun: true,
});
