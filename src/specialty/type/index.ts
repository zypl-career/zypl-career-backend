export interface ISpecialtyCreateDataDTO {
  name: string;
  EIOHPE: string; // Educational institutions of higher professional education
  class: number;
  specializationGroup: 1 | 2 | 3 | 4 | 5;
  clusterName: string;
  clusterTag: string;
  specialtyDescription: string;
  specialtyCode: number;
  specialtyName: string;
  formOfEducation: string;
  typeOfStudy: string;
  languageOfStudy: string;
  universityName: string;
  monthlyIncome: number;
  skillsLevel: number;
  futureGrowth: string;
  overview: string;
  careerOpportunities: string[];
}

export interface ISpecialtyUpdateDataDTO {
  name?: string;
  EIOHPE?: string; // Educational institutions of higher professional education
  class?: number;
  specializationGroup?: 1 | 2 | 3 | 4 | 5;
  clusterName?: string;
  clusterTag?: string;
  specialtyDescription?: string;
  specialtyCode?: number;
  specialtyName?: string;
  formOfEducation?: string;
  typeOfStudy?: string;
  languageOfStudy?: string;
  universityName?: string;
  monthlyIncome?: number;
  skillsLevel?: number;
  futureGrowth?: string;
  overview?: string;
  careerOpportunities?: string[];
}

export interface ISpecialtyGetDataDTO {
  name?: string;
  class?: number;
  specializationGroup?: 1 | 2 | 3 | 4 | 5;
  clusterName?: string;
  clusterTag?: string;
  specialtyCode?: number;
  specialtyName?: string;
  formOfEducation?: string;
  typeOfStudy?: string;
  languageOfStudy?: string;
  universityName?: string;
  monthlyIncome?: number;
  careerOpportunities?: string[];
  page?: number;
  limit?: number;
}

export interface IPaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
