import { getRepository } from 'typeorm';
import { Verify } from '../../../entities/EmailVerify.js';

export async function updateVerifyFromDb(email: string, code: number) {
  const repository = getRepository(Verify);
  const verify = await repository.findOne({ where: { email: email } });
  if (!verify) {
    console.log("Can't find user");
  } else {
    verify.code = code;
    await repository.save(verify);
    console.log('Verify successfully updated!');
  }
}
