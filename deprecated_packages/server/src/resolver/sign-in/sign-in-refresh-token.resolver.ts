import { FastifyReply, FastifyRequest } from 'fastify';
import { verifyToken } from './utils/verify-jwt.js';
import { generateToken } from './utils/generate-jwt.js';

export function signInRefreshTokenResolver(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const refreshToken = (request.body as any).refresh_token;
    const verify = verifyToken(refreshToken);
    if (!verify) {
      console.log('Refresh token is not active!');
      return response
        .status(200)
        .send({ status: 401, message: 'Refresh token is not active!' });
    }
    const newToken = generateToken({ username: (verify as any).username });
    console.log('new Token successfully send!');
    return response.send({ token: newToken });
  } catch (e: any) {
    console.error(e);
    response.status(500);
    response.send({ status: '500', error: e.message });
  }
}
