import jwt from 'jsonwebtoken';
import { AppConfig } from '../../../app/AppConfig.js';

export function generateToken(payload: object) {
  return jwt.sign(payload, AppConfig.jwtSecret, {
    expiresIn: AppConfig.jwtExpiration,
  });
}
