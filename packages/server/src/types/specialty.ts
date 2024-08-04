export interface ISpecialtyCreateDataDTO {
  name: string;
  EIOHPE: string; // Educational institutions of higher professional education
  class: number;
  specializationGroup: number;
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
  specializationGroup?: number;
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

export interface ISpecialtyFilterDTO {
  name?: string;
  class?: number;
  specializationGroup?: number;
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
}
