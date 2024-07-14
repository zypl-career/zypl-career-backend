import { DataSource } from 'typeorm';

import * as entities from '../_db/entity/_index.js';
import { parseConnectionString } from '../util/utils.js';

import { Config } from './config.app.js';

const dbConnectionOptions = parseConnectionString(Config.db.connection);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConnectionOptions.host,
  port: dbConnectionOptions.port,
  username: dbConnectionOptions.username,
  password: dbConnectionOptions.password,
  database: Config.db.database,
  synchronize: true,
  logging: ['error'],
  entities,
  migrationsRun: true,
  // migrations,
});
