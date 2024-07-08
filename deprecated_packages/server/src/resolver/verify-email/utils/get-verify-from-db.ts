import { getRepository } from 'typeorm';
import { Verify } from '../../../entities/EmailVerify.js';

export async function getVerifyFromDb(filter?: object) {
  const verifyRepository = getRepository(Verify);
  return filter
    ? await verifyRepository.find({ where: filter })
    : await verifyRepository.find();
}
