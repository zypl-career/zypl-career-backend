import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserFromDb } from '../sign-up/utils/get-user-from-db.js';
import { updateUserFromDb } from '../sign-up/utils/update-user-in-db.js';
import { getVerifyFromDb } from '../verify-email/utils/get-verify-from-db.js';

export async function restorePassword(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const { email, newPassword, code } = request.body as {
      newPassword: string;
      email: string;
      code: string;
    };
    const verify = await getVerifyFromDb({ email: email });
    if (verify.length !== 0) {
      if (verify[0].code === Number(code)) {
        const user = await getUserFromDb({ email: email });
        if (user.length === 0) {
          return response
            .status(200)
            .send({ status: 404, message: "Can't find user", payload: null });
        } else {
          const userObj = user[0];
          const newUser = {
            ...userObj,
            password: newPassword,
          };
          await updateUserFromDb(email, newUser);
          return response.status(200).send({
            status: 200,
            message: 'Password reset successfully ',
            payload: null,
          });
        }
      } else {
        return response.status(200).send({
          status: 400,
          message: 'Your code is incorect',
          payload: null,
        });
      }
    }
  } catch (e: any) {
    console.error(e);
    response.status(500);
    response.send({ status: '500', error: e.message });
  }
}
