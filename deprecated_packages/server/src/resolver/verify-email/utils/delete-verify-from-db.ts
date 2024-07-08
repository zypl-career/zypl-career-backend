import { getRepository } from 'typeorm';
import { Verify } from '../../../entities/EmailVerify.js';

export async function deleteVerifyFromDb(email: string) {
  const userRepository = getRepository(Verify);
  await userRepository.delete({ email: email });
  console.log('Verify successfully deleted!');
}
