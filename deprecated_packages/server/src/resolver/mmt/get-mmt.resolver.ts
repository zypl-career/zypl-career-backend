import { FastifyReply, FastifyRequest } from 'fastify';
import { verifyToken } from '../../utils/verify-token.js';
import { getMmtFromDb } from './utils/get-mmt-from-db.js';

interface IRequest {
  id: number | undefined;
  grade: number | undefined;
  specialization_group: number | undefined;
  specialty_code: number | undefined;
  from: number | undefined;
  to: number | undefined;
  name: string | undefined;
}

export async function getMmtResolver(
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

    const { id, grade, specialization_group, specialty_code, name }: IRequest =
      request.query as IRequest;

    console.log(request.query);

    const getMMT = await getMmtFromDb({
      id,
      grade,
      specialization_group,
      specialty_code,
      name_of_specialty: name,
    });

    return response.send({
      status: 200,
      message: null,
      payload: getMMT,
    });
  } catch (e: any) {
    console.error(e);
    response.status(500).send({ status: '500', error: e.message });
  }
}
