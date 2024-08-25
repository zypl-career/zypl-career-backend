import { Injectable } from '@nestjs/common';
import { transporter } from '../util/mailer.js';
import { EmailVerifyRepository } from '../_db/repository/email-verify.repository.js';

@Injectable()
export class EmailService {
  #repository = EmailVerifyRepository;

  async sendMessage(email: string) {
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    await transporter.sendMail({
      from: 'verify@zypl.ai',
      to: email,
      subject: 'Подтвердите ваш адрес электронной почты',
      html: `<html><body>Use the code below to log-in to the zypl-career interface:<br><h2><b>${randomNumber}</b></h2>\n\n</body></html>`,
    });

    const findEmail = await this.#repository.findOneBy({ email });

    if (findEmail) {
      this.#repository.delete(findEmail.id);
    }

    this.#repository.save({
      code: randomNumber,
      email: email,
    });

    return {
      message: 'Code successfully sended to email',
    };
  }
}
