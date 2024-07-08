import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

import { Config } from '../app/config.app.js';

/**
 * Parses a connection string into its components.
 *
 * @param connectionString - The connection string to be parsed.
 * @returns An object containing the parsed components of the connection string.
 */
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

/**
 * Generates a new migration for adding a new field to a table.
 *
 * @param tableName - The name of the table to which the new field will be added.
 * @param fieldName - The name of the new field.
 * @param fieldType - The data type of the new field.
 * @param isNullable - A boolean value indicating whether the new field can accept null values. Defaults to `true`.
 *
 * @returns A new instance of `MigrationInterface` that can be used to apply the migration.
 */
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

/**
 * Generates a hash of the given text using the SHA-256 algorithm.
 *
 * @param text - The text to be hashed.
 *
 * @returns A hexadecimal string representing the hashed text.
 *
 * @example
 * ```typescript
 * const hashedText = generateHash('exampleText');
 * console.log(hashedText); // Output: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
 * ```
 */
export function generateHash(text: string) {
  return createHash('sha256').update(text).digest('hex');
}

/**
 * Generates a refresh token for the given user ID and login.
 *
 * @param id - The unique identifier of the user.
 * @param login - The username or email of the user.
 *
 * @returns A JSON Web Token (JWT) string representing the refresh token for the user.
 */

/**
 * Generates a refresh token for the given user ID and login.
 *
 * @param id - The unique identifier of the user.
 * @param login - The username or email of the user.
 *
 * @returns A JSON Web Token (JWT) string representing the refresh token for the user.
 */
export function generateRefreshToken(id: string, login: string): string {
  const payload = {
    id,
    login,
    type: 'refresh',
  };
  return jwt.sign(payload, Config.jwtSecret);
}

/**
 * Generates a token for the given user ID and login.
 *
 * @param id - The unique identifier of the user.
 * @param login - The username or email of the user.
 *
 * @returns A JSON Web Token (JWT) string representing the token for the user.
 */
export function generateToken(id: string, login: string) {
  return jwt.sign({ id, login }, Config.jwtSecret, {
    expiresIn: Config.expiresIn,
  });
}

/**
 * Verifies a given JWT token using a secret key.
 *
 * @param {string} token - The JSON Web Token (JWT) to be verified.
 * @returns {any} The decoded payload of the token if verification is successful.
 * @throws {Error} If the token verification fails.
 *
 * @example
 * // Import the verifyToken function
 * import { verifyToken } from './path/to/this/module';
 *
 * // Example usage
 * const token = 'your.jwt.token.here';
 * try {
 *   const decodedPayload = verifyToken(token);
 *   console.log(decodedPayload); // Handle the decoded payload as needed
 * } catch (error) {
 *   console.error(error.message); // Handle the error appropriately
 * }
 */
export function verifyToken(token: string) {
  const secret = Config.jwtSecret;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Token verification failed');
  }
}

export const validateUUID =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
