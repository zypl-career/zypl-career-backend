import { FastifyReply, FastifyRequest } from 'fastify';
import { AppConfig } from '../../app/AppConfig.js';
import { verifyToken } from '../../utils/verify-token.js';
import { convertData } from './util/convert-data.js';
import { saveResultModalToDb } from './util/db-result-modal/save-result-modal-to-db.js';
export async function resultModalResolver(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const reqData = request.body as {
      name: string;
      first: number[];
      second: string[];
      third: string;
      fourth: string;
      fifth: string;
      sixth: string;
      seventh: string;
      time_spent: number;
    };

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
    const data = convertData(reqData);

    console.log(JSON.stringify(data));

    const res = await fetch(AppConfig.uri_model, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res?.ok) {
      return response
        .status(200)
        .send({ status: res?.status, message: res.statusText, payload: null });
    }

    const responseData = await res.json();
    const time = new Date().getTime();

    let createdTest = await saveResultModalToDb({
      name: reqData.name,
      modelResults: JSON.stringify(responseData.modelResults),
      data: JSON.stringify(responseData.data),
      time: time,
      email,
      timeSpent: reqData.time_spent ?? 0,
    });

    return response.send({
      status: 200,
      message: null,
      payload: createdTest,
    });
  } catch (e: any) {
    console.error(e);
    response.status(500);
    response.send({ status: '500', message: e.message, payload: null });
  }
}
