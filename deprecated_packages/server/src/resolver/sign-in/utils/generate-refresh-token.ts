import jwt from 'jsonwebtoken';
import { AppConfig } from '../../../app/AppConfig.js';

export function generateRefreshToken(username: string): string {
  const payload = {
    username,
    type: 'refresh',
  };
  return jwt.sign(payload, AppConfig.jwtSecret);
}
