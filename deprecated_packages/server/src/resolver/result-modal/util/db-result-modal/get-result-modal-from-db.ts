import { getRepository } from 'typeorm';
import { ResultModel } from '../../../../entities/Result-model.js';

export async function getResultModalFromDb({
  id,
  email,
}: {
  id: number | undefined;
  email: string;
}) {
  const userRepository = getRepository(ResultModel);
  return id || email
    ? await userRepository.find({ where: { id, email } })
    : await userRepository.find();
}
