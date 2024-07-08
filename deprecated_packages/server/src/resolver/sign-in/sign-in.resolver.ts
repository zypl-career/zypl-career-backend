import { FastifyReply, FastifyRequest } from 'fastify';
import { SignInDataType } from '../../types/types.js';
import jwt from 'jsonwebtoken';
import { AppConfig } from '../../app/AppConfig.js';
import { getUserFromDb } from '../sign-up/utils/get-user-from-db.js';
import { sha256 } from '../../utils/sha-256.js';
import { generateRefreshToken } from './utils/generate-refresh-token.js';

export async function signInResolver(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const { email, password } = request.body as SignInDataType;
    const user = await getUserFromDb({ email: email });
    if (user.length === 0) {
      return response
        .status(200)
        .send({ status: 404, message: "Can't find user", payload: null });
    }

    const checkPassword = user[0].password === sha256(password);
    if (user.length === 0 || user[0].email !== email || !checkPassword) {
      return response
        .status(200)
        .send({ status: 401, message: 'Invalid user', payload: null });
    }

    const expiresIn = AppConfig.jwtExpiration;

    // Generate a token
    const token = jwt.sign({ username: user[0].email }, AppConfig.jwtSecret, {
      expiresIn,
    });

    // Generate a refresh token
    const refreshToken = generateRefreshToken(email);
    const res = {
      status: 200,
      message: null,
      payload: {
        token: token,
        refresh_token: refreshToken,
        user: {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          dateOfBirth: user[0].dateOfBirth,
          city: user[0].city,
          gender: user[0].gender,
        },
      },
    };

    console.log('User successfully logined');
    return response.send(res);
  } catch (e: any) {
    console.error(e);
    response.status(500);
    response.send({ status: '500', error: e.message });
  }
}
