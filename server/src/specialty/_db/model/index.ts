export type SpecialtyModel = {
  id: string;
  name: string;
  EIOHPE: string; //educational institutions of higher professional education
  class: number;
  specializationGroup: 1 | 2 | 3 | 4 | 5;
  clusterName: string;
  clusterTag: string;
  specialtyDescription: string;
  specialtyCode: number | null;
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
