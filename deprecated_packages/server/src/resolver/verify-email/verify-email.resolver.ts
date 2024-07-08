import { FastifyReply, FastifyRequest } from 'fastify';
import { transporter } from './utils/mailer.js';
import { getVerifyFromDb } from './utils/get-verify-from-db.js';
import { updateVerifyFromDb } from './utils/update-verify-in-db.js';
import { saveVerifyToDb } from './utils/save-verify-to-db.js';

export async function verifyEmail(
  request: FastifyRequest,
  response: FastifyReply,
) {
  try {
    const { email } = request.body as { email: string };
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const getVerify = await getVerifyFromDb({ email: email });
    if (getVerify.length !== 0) {
      await updateVerifyFromDb(email, randomNumber);
    } else {
      saveVerifyToDb({
        email: email,
        code: randomNumber,
      });
    }
    await transporter.sendMail({
      from: 'verify@zypl.ai',
      to: email,
      subject: 'Подтвердите ваш адрес электронной почты',
      html: `<html><body>Use the code below to log-in to the zypl-career interface:<br><h2><b>${randomNumber}</b></h2>\n\n</body></html>`,
    });

    response.send({
      status: '200',
      message: 'succesfully send message to email',
      payload: null,
    });
  } catch (e: any) {
    console.error(e);
    response.status(500);
    response.send({ status: '500', error: e.message });
  }
}
