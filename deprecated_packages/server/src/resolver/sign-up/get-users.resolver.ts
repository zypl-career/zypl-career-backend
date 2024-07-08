import { FastifyReply, FastifyRequest } from 'fastify';
import { verifyToken } from '../../utils/verify-token.js';
import { getUserFromDb } from './utils/get-user-from-db.js';

export async function getUsersResolver(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const authorization = request.headers.authorization?.split(' ')[1];
    if (!authorization) {
      return response.status(200).send({
        status: 401,
        message: 'token is undefined',
        payload: null,
      });
    }
    const verifyTokenAuthorization = verifyToken(authorization);
    if (!verifyTokenAuthorization) {
      return response
        .status(200)
        .send({ status: 401, message: 'Invalid token', payload: null });
    }

    const getUser = await getUserFromDb();

    return response.send({
      status: 200,
      message: null,
      payload: getUser,
    });
  } catch (e: any) {
    console.error(e);
    response.status(500).send({ status: '500', error: e.message });
  }
}
