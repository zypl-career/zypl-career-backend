import { Verify } from '../../../entities/EmailVerify.js';
import { getRepository } from 'typeorm';

export async function saveVerifyToDb(data: { email: string; code: number }) {
  const verifyRepository = getRepository(Verify);
  const verify = new Verify();
  verify.email = data.email;
  verify.code = data.code;
  await verifyRepository.save(verify);
  console.log('Verify successfully saved!');
}
