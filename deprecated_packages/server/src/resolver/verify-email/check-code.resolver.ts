import { FastifyReply, FastifyRequest } from 'fastify';
import { getVerifyFromDb } from './utils/get-verify-from-db.js';

export async function checkCodeResolver(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const { email, code } = request.body as { email: string; code: string };

    const getVerify = await getVerifyFromDb({ email: email });

    if (getVerify.length !== 0) {
      if (getVerify[0].code === Number(code)) {
        return response.status(200).send({
          status: 200,
          message: null,
          payload: null,
        });
      } else {
        return response.status(200).send({
          status: 400,
          message: 'You code is a incorect',
          payload: null,
        });
      }
    } else {
      return response.status(200).send({
        status: 404,
        message: "Can't find email",
        payload: null,
      });
    }
  } catch (e: any) {
    console.error(e);
    response.status(500);
    response.send({ status: '500', message: e.message, payload: null });
  }
}
