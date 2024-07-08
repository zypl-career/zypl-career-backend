import { getRepository } from 'typeorm';
import { ResultModel } from '../../../../entities/Result-model.js';

type resultModalData = {
  name: string;
  email: string;
  modelResults: string;
  data: string;
  time: number;
  timeSpent: number;
};
export async function saveResultModalToDb(data: resultModalData) {
  const userRepository = getRepository(ResultModel);
  const result = new ResultModel();
  result.modelResults = data.modelResults;
  result.email = data.email;
  result.data = data.data;
  result.time = data.time;
  result.name = data.name;
  result.timeSpent = data.timeSpent;
  let createdTest = await userRepository.save(result);
  return { ...createdTest, modelResults: JSON.parse(createdTest.modelResults) };
}
