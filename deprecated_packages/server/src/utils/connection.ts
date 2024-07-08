import { Connection, createConnection } from 'typeorm';
import { User } from '../entities/User.js';
import { Verify } from '../entities/EmailVerify.js';
import { MmtSpecialty } from '../entities/Mmt-specialty.js';
import { ResultModel } from '../entities/Result-model.js';

let connection: Connection | undefined;

export const getConnection = async (): Promise<Connection> => {
  if (connection && connection.isConnected) {
    return connection;
  }
  connection = await createConnection({
    type: 'sqlite',
    database: './db/data.sqlite',
    synchronize: true,
    entities: [User, Verify, MmtSpecialty, ResultModel],
    logging: false,
  });
  return connection;
};
