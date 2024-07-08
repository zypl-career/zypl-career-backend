import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserFromDb } from './utils/get-user-from-db.js';

export async function hasUserResolver(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const { email } = request.body as { email: string };
    const getUser = await getUserFromDb({ email: email });

    if (getUser.length !== 0) {
      return response.send({
        status: 200,
        message: null,
        payload: null,
      });
    } else {
      return response.send({
        status: 404,
        message: null,
        payload: null,
      });
    }
  } catch (e: any) {
    console.error(e);
    response.status(500).send({ status: '500', error: e.message });
  }
}
