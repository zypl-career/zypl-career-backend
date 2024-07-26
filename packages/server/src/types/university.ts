export interface IUniversityCreateDataDTO {
  name: string;
  city: string;
  generalInfo: string;
}

export interface IUniversityUpdateDataDTO {
  name?: string;
  city?: string;
  generalInfo?: string;
}
