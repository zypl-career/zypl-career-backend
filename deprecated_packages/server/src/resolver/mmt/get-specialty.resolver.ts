import { FastifyReply, FastifyRequest } from 'fastify';
import { verifyToken } from '../../utils/verify-token.js';
import { getMmtDataFromDb } from '../../utils/get-mmt-data-from-db.js';

interface IRequest {
  modelResult: string | undefined;
  from: number | undefined;
  to: number | undefined;
}

export async function getSpecialtyResolver(
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

    const { modelResult, from, to }: IRequest = request.query as IRequest;

    let result = await getMmtDataFromDb({
      modelResultJSON: modelResult,
      skip: from,
      take: to,
    });

    return response.send({
      status: 200,
      message: null,
      payload: null,
      ...result,
    });
  } catch (e: any) {
    console.error(e);
    response.status(500).send({ status: '500', error: e.message });
  }
}
