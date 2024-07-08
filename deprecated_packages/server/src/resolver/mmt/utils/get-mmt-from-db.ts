import { getRepository } from 'typeorm';
import { MmtSpecialty } from '../../../entities/Mmt-specialty.js';

interface IFilter {
  id?: number;
  grade?: number;
  specialization_group?: number;
  specialty_code?: number;
  name_of_specialty?: string;
}

export async function getMmtFromDb(filter?: IFilter) {
  const userRepository = getRepository(MmtSpecialty);
  return filter
    ? await userRepository.find({ where: filter })
    : await userRepository.find();
}
