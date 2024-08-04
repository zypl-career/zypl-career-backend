import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { Config } from '../app/config.app.js';
import { ValidationError } from 'class-validator';

export * from './test.js';

export function parseConnectionString(connectionString: string): {
  host: string;
  port: number;
  username: string;
  password: string;
} {
  const [credentials, url] = connectionString.split('@');
  const [username, password] = credentials.split(':');
  const [host, port] = url.split(':');
  return {
    host,
    port: parseInt(port),
    username,
    password,
  };
}

export function generateMigration(
  tableName: string,
  fieldName: string,
  fieldType: string,
  isNullable: boolean = true,
): MigrationInterface {
  class GeneratedMigration implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        tableName,
        new TableColumn({
          name: fieldName,
          type: fieldType,
          isNullable,
        }),
      );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn(tableName, fieldName);
    }
  }

  return new GeneratedMigration();
}

export function generateHash(text: string) {
  return createHash('sha256').update(text).digest('hex');
}

export function generateRefreshToken(id: string, email: string): string {
  const payload = {
    id,
    email,
    type: 'refresh',
  };
  return jwt.sign(payload, Config.jwtSecret);
}

export function generateToken(id: string, email: string) {
  return jwt.sign({ id, email }, Config.jwtSecret, {
    expiresIn: Config.expiresIn,
  });
}

export function verifyToken(token: string) {
  const secret = Config.jwtSecret;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Token verification failed');
  }
}

export function validateUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function formatValidationErrors(errors: ValidationError[]) {
  const formattedErrors: { [key: string]: string[] } = {};
  errors.forEach((error) => {
    const property = error.property;
    Object.entries(error.constraints || {}).forEach(([key, value]) => {
      formattedErrors[property] = formattedErrors[property] || [];
      formattedErrors[property].push(value);
    });
  });
  return formattedErrors;
}
