export interface IUserCreateDataDTO {
  name: string;
  surname: string;
  patronymic?: string;
  gender: TGender;
  age?: number;
  district?: string;
  role: TRole;
  school?: string;
  email: string;
  password: string;
}

export interface IUserUpdateDataDTO {
  name?: string;
  surname?: string;
  patronymic?: string;
  gender?: TGender;
  age?: number;
  district?: string;
  role?: TRole;
  school?: string;
  email?: string;
  password?: string;
}

export interface IUserLoginDataDTO {
  email: string;
  password: string;
}

export type TGender = 'male' | 'female';

export type TRole = 'student' | 'teacher' | 'parents';

export interface IUserLoginResult {
  access: string;
  refresh: string;
}

export interface IMessage {
  message: string;
}

export interface IError {
  error: string;
}

export interface IValidation {
  validation: string | object;
}
