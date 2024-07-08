import { FastifyReply, FastifyRequest } from 'fastify';
import { verifyToken } from '../../utils/verify-token.js';
import { getResultModalFromDb } from './util/db-result-modal/get-result-modal-from-db.js';

export async function getResultModalsResolver(
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

    const email = (verifyTokenAuthorization as any).username;
    const id: number | undefined = (request.query as any).id;

    let getResultModals = await getResultModalFromDb({ id, email });

    const newArray = getResultModals.map((item) => {
      const modelResults = JSON.parse(item.modelResults);
      return {
        ...item,
        modelResults: modelResults,
      };
    });

    return response.send({
      status: 200,
      message: null,
      payload: newArray,
    });
  } catch (e: any) {
    console.error(e);
    response.status(500).send({ status: '500', error: e.message });
  }
}
