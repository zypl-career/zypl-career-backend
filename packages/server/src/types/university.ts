export interface IUniversityCreateDataDTO {
  name: string;
  city: string;
  generalInfoFile: string;
}

export interface IUniversityUpdateDataDTO {
  name?: string;
  city?: string;
  generalInfoFile?: string;
}
