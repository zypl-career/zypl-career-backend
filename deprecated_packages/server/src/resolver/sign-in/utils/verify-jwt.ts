import jwt from 'jsonwebtoken';
import { AppConfig } from '../../../app/AppConfig.js';

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, AppConfig.jwtSecret);
  } catch (err: any) {
    console.error(`${err.message}`);
    return null;
  }
}
