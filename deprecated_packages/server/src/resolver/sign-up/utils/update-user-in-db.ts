import { getRepository } from 'typeorm';
import { User } from '../../../entities/User.js';
import { sha256 } from '../../../utils/sha-256.js';

export async function updateUserFromDb(email: string, data: any) {
  const repository = getRepository(User);
  const user = await repository.findOne({ where: { email: email } });
  if (!user) {
    console.log("Can't find user");
  } else {
    user.name = data.name;
    user.email = data.email;
    user.dateOfBirth = data.dateOfBirth;
    user.city = data.city;
    user.gender = data.gender;
    if (data.password) {
      user.password = sha256(data.password);
    }
    await repository.save(user);

    console.log('User successfully updated!');
  }
}
