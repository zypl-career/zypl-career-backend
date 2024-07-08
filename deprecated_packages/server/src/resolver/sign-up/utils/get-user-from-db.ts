import { getRepository } from 'typeorm';
import { User } from '../../../entities/User.js';

export async function getUserFromDb(filter?: object) {
  const userRepository = getRepository(User);
  return filter
    ? await userRepository.find({ where: filter })
    : await userRepository.find();
}
