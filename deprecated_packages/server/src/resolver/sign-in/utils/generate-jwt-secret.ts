import * as crypto from 'crypto';

export const generateJwtSecret = (length: number): string => {
  return crypto.randomBytes(length).toString('hex');
};
