import { FastifyReply, FastifyRequest } from 'fastify';
import { verifyToken } from '../../utils/verify-token.js';
import { getUserFromDb } from './utils/get-user-from-db.js';
import { updateUserFromDb } from './utils/update-user-in-db.js';

export async function updateUserResolver(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const newUser = request.body as any;

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

    const { email }: { email: string } = request.params as any;

    const find = await getUserFromDb({ email: email });
    if (email !== newUser.username) {
      const findUsername = await getUserFromDb({
        username: newUser.username,
      });
      if (findUsername.length !== 0) {
        console.log('This username already exist');
        return response.status(200).send({
          status: 409,
          message: 'This username already exist',
          payload: null,
        });
      }
    }

    if (find.length === 0) {
      console.log("User can't find");
      return response.status(200).send({
        status: 404,
        message: "User can't find",
        payload: null,
      });
    }

    await updateUserFromDb(email, newUser);

    return response.status(200).send({
      status: 200,
      message: 'User successfully updated',
      payload: null,
    });
  } catch (e: any) {
    console.error(e);
    response.status(500);
    response.send({ status: '500', message: e.message, payload: null });
  }
}
