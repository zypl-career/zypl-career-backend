export interface InfoType {
  name: string;
  first: number[];
  second: string[];
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
  seventh: string;
  time_spent: number;
}

export type InfoTestModel = {
  id: string;
  email?: string;
  info: InfoType;
  resultTest: number[];
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
};
