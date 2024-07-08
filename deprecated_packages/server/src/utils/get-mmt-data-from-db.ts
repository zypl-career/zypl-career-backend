import { getRepository } from 'typeorm';
import { MmtSpecialty } from '../entities/Mmt-specialty.js';

interface IFilter {
  modelResultJSON: string | undefined;
  skip: number | undefined;
  take: number | undefined;
}

interface IMMT {
  entity_index: number;
  entity_id: number;
  entity_education: string;
  entity_grade: number;
  entity_specialization_group: 1;
  entity_cluster_name: string;
  entity_tag_by_cluster: string;
  entity_specialty_description: string;
  entity_tag_by_specialty: string;
  entity_specialty_code: number;
  entity_name_of_specialty: string;
  entity_form_of_education: string;
  entity_type_of_education: string;
  entity_tuition_fee_in_somoni: string;
  entity_language_of_education: string;
  entity_name_of_educational_institution: string;
}

export async function getMmtDataFromDb({
  modelResultJSON,
  skip,
  take,
}: IFilter) {
  const repository = await getRepository(MmtSpecialty);

  console.log('*&******8', modelResultJSON);
  if (!modelResultJSON) {
    return;
  }
  let modelResult = JSON.parse(modelResultJSON);
  try {
    const indexedResults = modelResult.map((value: any, index: any) => ({
      value,
      index,
    }));
    indexedResults.sort(
      (a: { value: number }, b: { value: number }) => a.value - b.value,
    );
    const sortedIndices = indexedResults.map(
      (item: { index: number }) => item.index + 1,
    );

    const res = await repository
      .createQueryBuilder('entity')
      .groupBy('entity.specialty_code')
      .getRawMany();

    const sortResultMMT: IMMT[] = [];

    sortedIndices.forEach((number: any) => {
      const filter = res.filter((e) => e.entity_grade === number);
      sortResultMMT.push(...filter);
    });

    let tempArray: { [key: string]: boolean } = {};

    let result: IMMT[] = [];

    sortResultMMT.forEach((item) => {
      if (!tempArray[item.entity_name_of_specialty]) {
        tempArray[item.entity_name_of_specialty] = true;
        result.push(item);
      }
    }, []);

    return {
      message: result.length,
      payload: result.slice(skip, take),
    };
  } catch (e) {
    console.log(e);
  }
}
