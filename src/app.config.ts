import * as dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  domain: process.env.BASE_URL || 'http://localhost:8000',
  port: process.env.PORT ? parseInt(process.env.PORT) : 8000,
  jwtSecret: process.env.JWT_SECRET || 'temp_enc_password',
  expiresIn: process.env.EXPIRES_IN || '2d',
  db: {
    database: process.env.APP_DATABASE || '',
    connection: process.env.DATABASE_URL || '',
  },
  modelAPI: process.env.MODEL_API || 'http://127.0.0.1:8887/predict',
};
