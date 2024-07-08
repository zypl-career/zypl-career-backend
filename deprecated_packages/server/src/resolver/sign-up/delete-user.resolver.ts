import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserFromDb } from './utils/get-user-from-db.js';
import { verifyToken } from '../../utils/verify-token.js';
import { deleteUserFromDb } from './utils/delete-user-from-db.js';

export async function deleteUserResolver(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const user = request.body as { email: string };

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

    const find = await getUserFromDb({ email: user.email });

    if (find.length === 0) {
      console.log('Cant find user');
      return response.status(200).send({
        status: 404,
        message: "Can't find user",
        payload: null,
      });
    }

    //Save user to DB
    await deleteUserFromDb(user);

    return response.status(200).send({
      status: 200,
      message: 'User successfully deleted',
      payload: null,
    });
  } catch (e: any) {
    console.error(e);
    response.status(500);
    response.send({ status: '500', message: e.message, payload: null });
  }
}
