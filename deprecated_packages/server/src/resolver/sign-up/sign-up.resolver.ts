import { FastifyReply, FastifyRequest } from 'fastify';
import { SignUpDataType } from '../../types/types.js';
import { getUserFromDb } from './utils/get-user-from-db.js';
import { sha256 } from '../../utils/sha-256.js';
import { saveUserToDb } from './utils/save-user-to-db.js';
import { getVerifyFromDb } from '../verify-email/utils/get-verify-from-db.js';

export async function signUpResolver(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const newUser = request.body as SignUpDataType;

    const getVerify = await getVerifyFromDb({ email: newUser.email });

    if (getVerify.length !== 0) {
      if (getVerify[0].code === Number(newUser.code)) {
        const find = await getUserFromDb({ email: newUser.email });

        if (find.length !== 0) {
          console.log('User already registered');
          return response.status(200).send({
            status: 409,
            message: 'User already registered',
            payload: null,
          });
        }
        newUser.password = sha256(newUser.password);

        await saveUserToDb(newUser);

        return response.status(200).send({
          status: 201,
          message: 'User successfully registered',
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
