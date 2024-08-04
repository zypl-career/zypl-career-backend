export type SpecialtyModel = {
  id: string;
  name: string;
  EIOHPE: string; //educational institutions of higher professional education
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
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
};
