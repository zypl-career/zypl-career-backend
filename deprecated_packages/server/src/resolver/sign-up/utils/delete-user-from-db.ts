import { getRepository } from 'typeorm';
import { User } from '../../../entities/User.js';

export async function deleteUserFromDb(data: { email: string }) {
  const userRepository = getRepository(User);
  await userRepository.delete({ email: data.email });
  console.log('User successfully deleted!');
}
