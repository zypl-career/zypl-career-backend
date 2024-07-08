import { SignUpDataType } from '../../../types/types.js';
import { getRepository } from 'typeorm';
import { User } from '../../../entities/User.js';

export async function saveUserToDb(data: SignUpDataType) {
  const userRepository = getRepository(User);
  const user = new User();
  user.name = data.name;
  user.email = data.email;
  user.dateOfBirth = data.dateOfBirth;
  user.city = data.city;
  user.gender = data.gender;
  user.password = data.password;

  await userRepository.save(user);
  console.log('user successfully saved!');
}
